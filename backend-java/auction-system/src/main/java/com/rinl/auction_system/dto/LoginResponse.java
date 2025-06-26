// src/main/java/com/rinl/auction_system/dto/LoginResponseDTO.java

package com.rinl.auction_system.dto;

public class LoginResponse{
    private String role; // "admin" or "company"
    private int id;      // admin_id or company_id
    private String message;

    public LoginResponse() {}

    public LoginResponse(String role, int id, String message) {
        this.role = role;
        this.id = id;
        this.message = message;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
