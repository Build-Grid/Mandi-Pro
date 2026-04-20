package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.constants.LogMessages;
import com.buildgrid.mandipro.constants.Status;
import com.buildgrid.mandipro.dto.mapper.PartyMapper;
import com.buildgrid.mandipro.dto.request.PartyRequest;
import com.buildgrid.mandipro.dto.response.PartyResponse;
import com.buildgrid.mandipro.entity.Firm;
import com.buildgrid.mandipro.entity.Party;
import com.buildgrid.mandipro.entity.User;
import com.buildgrid.mandipro.exception.AppException;
import com.buildgrid.mandipro.exception.ResourceNotFoundException;
import com.buildgrid.mandipro.repository.PartyRepository;
import com.buildgrid.mandipro.repository.UserRepository;
import com.buildgrid.mandipro.security.SecurityUtils;
import com.buildgrid.mandipro.service.PartyService;
import com.buildgrid.mandipro.util.TraceIdUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class PartyServiceImpl implements PartyService {

    private final PartyRepository partyRepository;
    private final PartyMapper partyMapper;
    private final UserRepository userRepository;

    @Override
    @Transactional
    public PartyResponse createParty(PartyRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "party.create", TraceIdUtil.get());
        User currentUser = getCurrentUserOrThrow();
        Firm firm = currentUser.getFirm();
        assertFirmActive(firm, "party.create");

        Party party = partyMapper.toEntity(request);
        party.setFirm(firm);
        Party savedParty = partyRepository.save(party);

        log.info(LogMessages.OPERATION_COMPLETED, "party.create", TraceIdUtil.get());
        return partyMapper.toResponse(savedParty);
    }

    @Override
    @Transactional
    public List<PartyResponse> createParties(List<PartyRequest> requests) {
        log.info(LogMessages.OPERATION_STARTED, "party.createBulk", TraceIdUtil.get());
        User currentUser = getCurrentUserOrThrow();
        Firm firm = currentUser.getFirm();
        assertFirmActive(firm, "party.createBulk");

        List<Party> parties = requests.stream()
                .map(partyMapper::toEntity)
                .peek(party -> party.setFirm(firm))
                .toList();
                
        List<Party> savedParties = partyRepository.saveAll(parties);
        log.info(LogMessages.OPERATION_COMPLETED_WITH_COUNT, "party.createBulk", savedParties.size(), TraceIdUtil.get());
        return partyMapper.toResponseList(savedParties);
    }

    @Override
    @Transactional
    public PartyResponse updateParty(Long id, PartyRequest request) {
        log.info(LogMessages.OPERATION_STARTED, "party.update", TraceIdUtil.get());
        Party party = fetchPartyFromIdOrThrow(id);

        party.setName(request.getName());
        party.setType(request.getType());
        party.setContactNumber(request.getContactNumber());
        party.setAddress(request.getAddress());

        Party updatedParty = partyRepository.save(party);
        log.info(LogMessages.OPERATION_COMPLETED, "party.update", TraceIdUtil.get());
        return partyMapper.toResponse(updatedParty);
    }

    @Override
    @Transactional
    public PartyResponse getParty(Long id) {
        log.info(LogMessages.OPERATION_STARTED, "party.get", TraceIdUtil.get());
        Party party = fetchPartyFromIdOrThrow(id);
        log.info(LogMessages.OPERATION_COMPLETED, "party.get", TraceIdUtil.get());
        return partyMapper.toResponse(party);
    }

    @Override
    @Transactional
    public List<PartyResponse> getAllParties() {
        log.info(LogMessages.OPERATION_STARTED, "party.getAll", TraceIdUtil.get());
        User currentUser = getCurrentUserOrThrow();
        Long firmId = getFirmIdOrThrow(currentUser);

        List<Party> parties = partyRepository.findByFirm_IdAndStatusNot(firmId, Status.CANCEL);
        log.info(LogMessages.OPERATION_COMPLETED_WITH_COUNT, "party.getAll", parties.size(), TraceIdUtil.get());
        return partyMapper.toResponseList(parties);
    }

    @Override
    @Transactional
    public void deleteParty(Long id) {
        log.info(LogMessages.OPERATION_STARTED, "party.delete", TraceIdUtil.get());
        Party party = fetchPartyFromIdOrThrow(id);
        
        party.setStatus(Status.CANCEL);
        partyRepository.save(party);
        log.info(LogMessages.OPERATION_COMPLETED, "party.delete", TraceIdUtil.get());
    }

    private Party fetchPartyFromIdOrThrow(Long id) {
        User currentUser = getCurrentUserOrThrow();
        Long firmId = getFirmIdOrThrow(currentUser);

        Party party = partyRepository.findByIdAndFirm_IdAndStatusNot(id, firmId, Status.CANCEL)
                .orElseThrow(() -> new ResourceNotFoundException("Party not found or already deleted"));
        
        assertFirmActive(party.getFirm(), "party.fetch");
        return party;
    }

    private User getCurrentUserOrThrow() {
        String email = SecurityUtils.getCurrentUserEmail()
                .orElseThrow(() -> new AppException("Not authenticated", HttpStatus.UNAUTHORIZED));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authenticated user not found"));

        if (user.getFirm() != null) {
            assertFirmActive(user.getFirm(), "party.authenticatedAccess");
        }

        return user;
    }

    private Long getFirmIdOrThrow(User currentUser) {
        Firm firm = currentUser.getFirm();
        if(firm == null) {
            throw new AppException("User not associated with any firm.", HttpStatus.FORBIDDEN);
        }

        assertFirmActive(firm, "party.access");

        return firm.getId();
    }

    private void assertFirmActive(Firm firm, String operationName) {
        if (firm.getStatus() != Status.ACTIVE) {
            log.warn(LogMessages.FIRM_INACTIVE_BLOCKED,
                    operationName,
                    firm.getId(),
                    firm.getStatus(),
                    TraceIdUtil.get());
            throw new AppException("Firm is no longer active", HttpStatus.FORBIDDEN);
        }
    }
}
