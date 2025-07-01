// Updated AuthController.java
package com.rinl.auction_system.controller;

import com.rinl.auction_system.dto.LoginRequest;
import com.rinl.auction_system.dto.LoginResponse;
import com.rinl.auction_system.model.Admin;
import com.rinl.auction_system.model.Company;
import com.rinl.auction_system.repository.AdminRepository;
import com.rinl.auction_system.repository.CompanyRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CompanyRepository companyRepository;

    private void setCookie(HttpServletResponse response, String name, String value, int maxAge) {
        try {
            String encodedValue = URLEncoder.encode(value, StandardCharsets.UTF_8.toString());
            Cookie cookie = new Cookie(name, encodedValue);
            cookie.setPath("/");
            cookie.setHttpOnly(false);
            cookie.setSecure(false);
            cookie.setMaxAge(maxAge); // e.g., 3600 seconds = 1 hour
            response.addCookie(cookie);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        String usernameOrEmail = loginRequest.getUsername();
        String password = loginRequest.getPassword();

        // Admin
        Optional<Admin> adminOpt = adminRepository.findByUsername(usernameOrEmail);
        if (adminOpt.isPresent() && adminOpt.get().getPassword().equals(password)) {
            Admin admin = adminOpt.get();
            setCookie(response, "role", "admin", 3600);
            setCookie(response, "userId", String.valueOf(admin.getAdminId()), 3600);
            setCookie(response, "username", admin.getUsername(), 3600); // optional
            return new LoginResponse("admin", admin.getAdminId(), "Admin", "Admin login successful");
        }

        // Company
        Optional<Company> companyOpt = companyRepository.findByEmail(usernameOrEmail);
        if (companyOpt.isPresent()) {
            Company company = companyOpt.get();
            if (company.getPassword().equals(password)) {
                setCookie(response, "role", "company", 3600);
                setCookie(response, "userId", String.valueOf(company.getId()), 3600);
                setCookie(response, "companyName", company.getName(), 3600); // This line caused the issue
                return new LoginResponse("company", company.getId(), company.getName(), "Company login successful");
            }
        }

        return new LoginResponse(null, -1, "", "Invalid credentials");
    }


}
