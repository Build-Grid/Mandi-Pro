package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.dto.mapper.CommodityTypeMapper;
import com.buildgrid.mandipro.dto.request.CommodityTypeRequest;
import com.buildgrid.mandipro.dto.request.CommodityTypeUpdateRequest;
import com.buildgrid.mandipro.dto.response.CommodityTypeResponse;
import com.buildgrid.mandipro.entity.CommodityType;
import com.buildgrid.mandipro.entity.Firm;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.CommodityTypeRepository;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.security.SecurityUtils;
import com.buildgrid.mandipro.service.CommodityTypeService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.buildgrid.mandipro.util.ValidationUtil.assertFirmActive;
import static com.buildgrid.mandipro.util.ValidationUtil.sanitizeTrimToNull;
import static com.buildgrid.mandipro.util.ValidationUtil.validateOwnerAndManager;
import static java.util.Objects.isNull;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommodityTypeServiceImpl implements CommodityTypeService {

    private final UserRepository userRepository;
    private final CommodityTypeRepository commodityTypeRepository;
    private final CommodityTypeMapper commodityTypeMapper;

    @Override
    @Transactional
    public CommodityTypeResponse updateCommodityType(CommodityTypeUpdateRequest commodityTypeUpdateRequest) {
        sanitizeCommodityTypeUpdateRequest(commodityTypeUpdateRequest);
        User currentUser = getCurrentUserOrThrow();
        validateOwnerAndManager(currentUser, "commodityType.manage", "Only OWNER or MANAGER can manage commodity types");
        CommodityType commodityType = commodityTypeRepository.findById(commodityTypeUpdateRequest.getId())
                .orElseThrow(() -> new AppException("Commodity type not found", HttpStatus.NOT_FOUND));
        if(!commodityType.getFirm().equals(currentUser.getFirm())){
            throw new AppException("Commodity type does not belong to your firm", HttpStatus.FORBIDDEN);
        }
        if(!isNull(commodityTypeUpdateRequest.getDescription()) && !commodityTypeUpdateRequest.getDescription().isEmpty()){
            commodityType.setDescription(commodityTypeUpdateRequest.getDescription());
        }
        if(!isNull(commodityTypeUpdateRequest.getTypeName()) && !commodityTypeUpdateRequest.getTypeName().isEmpty()){
            commodityType.setTypeName(commodityTypeUpdateRequest.getTypeName());
        }
        CommodityType updatedCommodityType = commodityTypeRepository.save(commodityType);
        return convertToCommodityTypeResponse(updatedCommodityType);
    }

    @Override
    @Transactional
    public void deleteCommodityType(Long id) {
        User currentUser = getCurrentUserOrThrow();
        validateOwnerAndManager(currentUser, "commodityType.manage", "Only OWNER or MANAGER can manage commodity types");
        CommodityType commodityType = commodityTypeRepository.findById(id)
                .orElseThrow(() -> new AppException("Commodity type not found", HttpStatus.NOT_FOUND));
        if (commodityType.getStatus() == Status.CANCEL) {
            throw new AppException("Commodity type cancelled", HttpStatus.BAD_REQUEST);
        }
        if(!commodityType.getFirm().equals(currentUser.getFirm())){
            throw new AppException("Commodity type does not belong to your firm", HttpStatus.FORBIDDEN);
        }
        commodityType.setStatus(Status.CANCEL);
        commodityTypeRepository.save(commodityType);
    }

    @Override
    @Transactional
    public List<CommodityTypeResponse> getAllCommodityTypes() {
        User currentUser = getCurrentUserOrThrow();
        Firm firm = currentUser.getFirm();
        List<CommodityType> commodityTypes = commodityTypeRepository.findByFirm_Id(firm.getId())
                .orElseThrow(() -> new ResourceNotFoundException("No commodity types found for the firm"));

        return convertToCommodityTypeResponseList(commodityTypes);
    }


    @Override
    @Transactional
    public CommodityTypeResponse createCommodityType(CommodityTypeRequest commodityTypeRequest) {
        sanitizeCommodityTypeRequest(commodityTypeRequest);

        User currentUser = getCurrentUserOrThrow();
        validateOwnerAndManager(currentUser, "commodityType.manage", "Only OWNER or MANAGER can manage commodity types");

        CommodityType commodityType = commodityTypeMapper.toCommodityTypeEntity(commodityTypeRequest);
        commodityType.setFirm(currentUser.getFirm());
        CommodityType savedCommodityType = commodityTypeRepository.save(commodityType);

        return convertToCommodityTypeResponse(savedCommodityType);
    }

    @Override
    @Transactional
    public CommodityTypeResponse getCommodityTypeById(Long id) {
        User currentUser = getCurrentUserOrThrow();
        CommodityType commodityType = commodityTypeRepository.findById(id)
                .orElseThrow(()-> new AppException("Commodity type not found", HttpStatus.NOT_FOUND));
        if (!commodityType.getFirm().equals(currentUser.getFirm())) {
            throw new AppException("Commodity type does not belong to your firm", HttpStatus.FORBIDDEN);
        }
        return convertToCommodityTypeResponse(commodityType);
    }

    private CommodityTypeResponse convertToCommodityTypeResponse(CommodityType commodityType) {
        return commodityTypeMapper.toCommodityTypeResponse(commodityType);
    }

    private List<CommodityTypeResponse> convertToCommodityTypeResponseList(List<CommodityType> commodityTypes) {
        return commodityTypeMapper.toCommodityTypeResponseList(commodityTypes);
    }

    private void sanitizeCommodityTypeRequest(CommodityTypeRequest commodityTypeRequest) {
        commodityTypeRequest.setTypeName(sanitizeTrimToNull(commodityTypeRequest.getTypeName()));
        commodityTypeRequest.setDescription(sanitizeTrimToNull(commodityTypeRequest.getDescription()));
    }

    private void sanitizeCommodityTypeUpdateRequest(CommodityTypeUpdateRequest commodityTypeUpdateRequest) {
        commodityTypeUpdateRequest.setTypeName(sanitizeTrimToNull(commodityTypeUpdateRequest.getTypeName()));
        commodityTypeUpdateRequest.setDescription(sanitizeTrimToNull(commodityTypeUpdateRequest.getDescription()));
    }

    private User getCurrentUserOrThrow() {
        String email = SecurityUtils.getCurrentUserEmail()
                .orElseThrow(() -> new AppException("Not authenticated", HttpStatus.UNAUTHORIZED));
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        if (!isNull(user.getFirm())) {
            assertFirmActive(user.getFirm(), "firmInvite.authenticatedAccess");
        }
        return user;
    }

}
