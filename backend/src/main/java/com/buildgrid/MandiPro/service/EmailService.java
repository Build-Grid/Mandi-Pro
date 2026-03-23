package com.buildgrid.mandipro.service;

public interface EmailService {
    void sendPasswordResetEmail(String to, String resetLink, int expiryMinutes);
}
