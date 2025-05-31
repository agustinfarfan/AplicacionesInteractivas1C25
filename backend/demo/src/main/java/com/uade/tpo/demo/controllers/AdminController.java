package com.uade.tpo.demo.controllers;

import com.uade.tpo.demo.service.ExpirationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("admin")
public class AdminController {

    @Autowired
    private ExpirationService expirationService;

    @PostMapping("cron/cart-expiration")
    public ResponseEntity<String> runExpirationNow() {
        expirationService.runCartExpiration();
        return ResponseEntity.ok("Manual cart expiration cron triggered.");
    }

}
