package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.dto.mapper.CommodityMapper;
import com.buildgrid.mandipro.dto.request.CommodityRequest;
import com.buildgrid.mandipro.dto.response.CommodityResponse;
import com.buildgrid.mandipro.entity.Commodity;
import com.buildgrid.mandipro.entity.CommodityType;
import com.buildgrid.mandipro.entity.Firm;
import com.buildgrid.mandipro.entity.Unit;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.CommodityRepository;
import com.buildgrid.mandipro.repository.CommodityTypeRepository;
import com.buildgrid.mandipro.repository.UnitRepository;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.security.SecurityUtils;
import com.buildgrid.mandipro.service.CommodityService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.buildgrid.mandipro.util.ValidationUtil.assertFirmActive;
import static com.buildgrid.mandipro.util.ValidationUtil.sanitizeTrimToNull;
import static com.buildgrid.mandipro.util.ValidationUtil.validateOwnerAndManager;

@Service
@RequiredArgsConstructor
public class CommodityServiceImpl implements CommodityService {
    private final CommodityMapper commodityMapper;
    private final CommodityRepository commodityRepository;
    private final UnitRepository unitRepository;
    private final CommodityTypeRepository commodityTypeRepository;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public CommodityResponse createCommodity(CommodityRequest commodityRequest) {
        sanitizeCommodityRequest(commodityRequest);

        User currentUser = getCurrentUserOrThrow();
        validateOwnerAndManager(currentUser, "commodity.create", "Only OWNER or MANAGER can manage commodities");

        Unit unit = getUnitOrThrow(commodityRequest.getUnitId());
        CommodityType commodityType = getCommodityTypeInFirmOrThrow(
                commodityRequest.getCommodityTypeId(), currentUser.getFirm().getId());

        Commodity commodity = commodityMapper.toCommodityEntity(commodityRequest);
        commodity.setUnit(unit);
        commodity.setCommodityType(commodityType);
        commodity.setFirm(currentUser.getFirm());

        Commodity savedCommodity = commodityRepository.save(commodity);
        return commodityMapper.toCommodityResponse(savedCommodity);
    }

    @Override
    @Transactional
    public CommodityResponse updateCommodity(CommodityRequest commodityRequest, Long commodityId) {
        sanitizeCommodityRequest(commodityRequest);

        User currentUser = getCurrentUserOrThrow();
        validateOwnerAndManager(currentUser, "commodity.update", "Only OWNER or MANAGER can manage commodities");

        Commodity commodity = getCommodityInFirmOrThrow(commodityId, currentUser.getFirm().getId());

        if (commodityRequest.getName() != null) {
            commodity.setName(commodityRequest.getName());
        }
        if (commodityRequest.getLocalName() != null) {
            commodity.setLocalName(commodityRequest.getLocalName());
        }
        if (commodityRequest.getDescription() != null) {
            commodity.setDescription(commodityRequest.getDescription());
        }

        if (commodityRequest.getUnitId() != null) {
            Unit unit = getUnitOrThrow(commodityRequest.getUnitId());
            commodity.setUnit(unit);
        }

        if (commodityRequest.getCommodityTypeId() != null) {
            CommodityType commodityType = getCommodityTypeInFirmOrThrow(
                    commodityRequest.getCommodityTypeId(), currentUser.getFirm().getId());
            commodity.setCommodityType(commodityType);
        }

        Commodity updatedCommodity = commodityRepository.save(commodity);
        return commodityMapper.toCommodityResponse(updatedCommodity);
    }

    @Override
    @Transactional
    public void deleteCommodity(Long commodityId) {
        User currentUser = getCurrentUserOrThrow();
        validateOwnerAndManager(currentUser, "commodity.delete", "Only OWNER or MANAGER can manage commodities");

        Commodity commodity = getCommodityInFirmOrThrow(commodityId, currentUser.getFirm().getId());
        if (commodity.getStatus() == Status.CANCEL) {
            throw new AppException("Commodity already cancelled", HttpStatus.BAD_REQUEST);
        }

        commodity.setStatus(Status.CANCEL);
        commodityRepository.save(commodity);
    }

    @Override
    @Transactional
    public CommodityResponse fetchCommodityById(Long commodityId) {
        User currentUser = getCurrentUserOrThrow();
        Commodity commodity = getCommodityInFirmOrThrow(commodityId, currentUser.getFirm().getId());
        return commodityMapper.toCommodityResponse(commodity);
    }

    @Override
    @Transactional
    public List<CommodityResponse> fetchAllCommodities() {
        User currentUser = getCurrentUserOrThrow();
        List<Commodity> commodities = commodityRepository.findByFirm_Id(currentUser.getFirm().getId())
                .orElseThrow(() -> new ResourceNotFoundException("No commodities found for the firm"));
        return commodityMapper.toCommodityResponseList(commodities);
    }

    private void sanitizeCommodityRequest(CommodityRequest commodityRequest) {
        commodityRequest.setName(sanitizeTrimToNull(commodityRequest.getName()));
        commodityRequest.setLocalName(sanitizeTrimToNull(commodityRequest.getLocalName()));
        commodityRequest.setDescription(sanitizeTrimToNull(commodityRequest.getDescription()));
    }

    private Commodity getCommodityInFirmOrThrow(Long commodityId, Long firmId) {
        Commodity commodity = commodityRepository.findById(commodityId)
                .orElseThrow(() -> new ResourceNotFoundException("Commodity not found with id: " + commodityId));
        if (!commodity.getFirm().getId().equals(firmId)) {
            throw new AppException("Commodity does not belong to your firm", HttpStatus.FORBIDDEN);
        }
        return commodity;
    }

    private CommodityType getCommodityTypeInFirmOrThrow(Long commodityTypeId, Long firmId) {
        CommodityType commodityType = commodityTypeRepository.findById(commodityTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Commodity Type not found with id: " + commodityTypeId));
        if (!commodityType.getFirm().getId().equals(firmId)) {
            throw new AppException("Commodity type does not belong to your firm", HttpStatus.FORBIDDEN);
        }
        return commodityType;
    }

    private Unit getUnitOrThrow(Long unitId) {
        return unitRepository.findById(unitId)
                .orElseThrow(() -> new ResourceNotFoundException("Unit not found with id: " + unitId));
    }

    private User getCurrentUserOrThrow() {
        String email = SecurityUtils.getCurrentUserEmail()
                .orElseThrow(() -> new AppException("Not authenticated", HttpStatus.UNAUTHORIZED));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        Firm firm = user.getFirm();
        if (firm == null) {
            throw new AppException("Authenticated user is not associated with a firm", HttpStatus.FORBIDDEN);
        }

        assertFirmActive(firm, "commodity.authenticatedAccess");
        return user;
    }
}
