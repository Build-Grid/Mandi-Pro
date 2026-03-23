package com.buildgrid.mandipro.service.impl;

import com.buildgrid.mandipro.service.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
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
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject("Password Reset Request - MandiPro");
            helper.setText(buildHtmlBody(resetLink, expiryMinutes), true);

            mailSender.send(message);
            log.info("Password reset email sent to: {}", to);
        } catch (MessagingException e) {
            log.error("Failed to send password reset email to: {}", to, e);
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }

    private String buildHtmlBody(String resetLink, int expiryMinutes) {
        return """
                <!DOCTYPE html>
                <html lang="en">
                <head>
                  <meta charset="UTF-8"/>
                  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                  <title>Password Reset</title>
                </head>
                <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
                  <table width="100%%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8;padding:40px 0;">
                    <tr>
                      <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0"
                               style="background-color:#ffffff;border-radius:8px;
                                      box-shadow:0 2px 8px rgba(0,0,0,0.08);overflow:hidden;">
                          <!-- Header -->
                          <tr>
                            <td style="background-color:#1a6b3c;padding:32px 40px;text-align:center;">
                              <h1 style="margin:0;color:#ffffff;font-size:26px;letter-spacing:1px;">MandiPro</h1>
                            </td>
                          </tr>
                          <!-- Body -->
                          <tr>
                            <td style="padding:40px;">
                              <h2 style="margin:0 0 16px;color:#1a1a1a;font-size:20px;">Password Reset Request</h2>
                              <p style="margin:0 0 12px;color:#555;line-height:1.6;">
                                We received a request to reset the password for your MandiPro account.
                                Click the button below to choose a new password.
                              </p>
                              <p style="margin:0 0 28px;color:#555;line-height:1.6;">
                                This link will expire in <strong>%d minutes</strong>.
                              </p>
                              <table cellpadding="0" cellspacing="0" width="100%%">
                                <tr>
                                  <td align="center">
                                    <a href="%s"
                                       style="display:inline-block;padding:14px 36px;
                                              background-color:#1a6b3c;color:#ffffff;
                                              text-decoration:none;border-radius:6px;
                                              font-size:16px;font-weight:bold;">
                                      Reset Password
                                    </a>
                                  </td>
                                </tr>
                              </table>
                              <p style="margin:28px 0 0;color:#888;font-size:13px;line-height:1.6;">
                                If the button doesn't work, copy and paste this link into your browser:<br/>
                                <a href="%s" style="color:#1a6b3c;word-break:break-all;">%s</a>
                              </p>
                              <hr style="border:none;border-top:1px solid #eee;margin:28px 0;"/>
                              <p style="margin:0;color:#aaa;font-size:12px;">
                                If you did not request a password reset, you can safely ignore this email.
                                Your password will remain unchanged.
                              </p>
                            </td>
                          </tr>
                          <!-- Footer -->
                          <tr>
                            <td style="background-color:#f4f6f8;padding:20px 40px;text-align:center;">
                              <p style="margin:0;color:#bbb;font-size:12px;">
                                &copy; 2024 MandiPro. All rights reserved.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(expiryMinutes, resetLink, resetLink, resetLink);
    }
}
