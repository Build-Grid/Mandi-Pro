package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromEmail;

    @Override
    public void sendPasswordResetEmail(String to, String resetLink, int expiryMinutes) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject("Password Reset Request - MandiPro");
        message.setText(
                "To reset your password, click the link below:\n\n" + resetLink +
                "\n\nThis link will expire in " + expiryMinutes + " minutes." +
                "\n\nIf you did not request a password reset, please ignore this email."
        );
        mailSender.send(message);
        log.info("Password reset email sent to: {}", to);
    }
}
