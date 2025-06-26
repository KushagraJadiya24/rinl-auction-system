package com.rinl.auction_system.controller;

import com.rinl.auction_system.dto.LoginRequest;
import com.rinl.auction_system.dto.LoginResponse;
import com.rinl.auction_system.model.Admin;
import com.rinl.auction_system.model.Company;
import com.rinl.auction_system.repository.AdminRepository;
import com.rinl.auction_system.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        String usernameOrEmail = loginRequest.getUsername(); // Input field
        String password = loginRequest.getPassword();

        // Try Admin by username
        Optional<Admin> adminOpt = adminRepository.findByUsername(usernameOrEmail);
        if (adminOpt.isPresent() && adminOpt.get().getPassword().equals(password)) {
            return new LoginResponse("admin", adminOpt.get().getAdminId(), "Admin login successful");
        }

        // Try Company by email
        Optional<Company> companyOpt = companyRepository.findByEmail(usernameOrEmail);
        if (companyOpt.isPresent()) {
            Company company = companyOpt.get();
            if (company.getPassword().equals(password)) {
                return new LoginResponse("company", company.getId(), "Company login successful");
            }
        }

        return new LoginResponse(null, -1, "Invalid credentials");
    }
}
