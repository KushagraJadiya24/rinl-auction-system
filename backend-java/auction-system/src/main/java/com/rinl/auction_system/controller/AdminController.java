package com.rinl.auction_system.controller;

import com.rinl.auction_system.dto.LoginRequest;
import com.rinl.auction_system.model.Admin;
import com.rinl.auction_system.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*") // For frontend connection
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        Optional<Admin> adminOptional = adminRepository.findByUsername(loginRequest.getUsername());

        if (adminOptional.isPresent()) {
            Admin admin = adminOptional.get();
            if (admin.getPassword().equals(loginRequest.getPassword())) {
                return "Login successful!";
            } else {
                return "Invalid password.";
            }
        } else {
            return "Admin not found.";
        }
    }
}
