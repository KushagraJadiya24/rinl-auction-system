package com.rinl.auction_system.dto;

public class LoginResponse {
    private String role;
    private int id;
    private String name;
    private String message;

    // Constructor for success with all fields
    public LoginResponse(String role, int id, String name, String message) {
        this.role = role;
        this.id = id;
        this.name = name;
        this.message = message;
    }

    // Constructor for error case
    public LoginResponse(String role, int id, String message) {
        this.role = role;
        this.id = id;
        this.message = message;
        this.name = null;
    }

    public String getRole() {
        return role;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getMessage() {
        return message;
    }
}
