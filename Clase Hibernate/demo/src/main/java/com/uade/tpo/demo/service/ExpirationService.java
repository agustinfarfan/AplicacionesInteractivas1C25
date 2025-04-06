package com.uade.tpo.demo.service;

import com.uade.tpo.demo.repository.CartRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ExpirationService {

    @Autowired
    private CartRepository cartRepository;


    @Scheduled(cron = "0 0 0 * * *")
    public void deleteExpiredCarts() {
        cartRepository.deleteAllByExpirationDateBefore(LocalDateTime.now());
    }

    @Transactional
    public void runCartExpiration() {
        cartRepository.deleteAllByExpirationDateBefore(LocalDateTime.now());
    }

}
