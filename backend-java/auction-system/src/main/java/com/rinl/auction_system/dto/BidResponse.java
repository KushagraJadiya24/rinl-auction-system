package com.rinl.auction_system.dto;

import java.time.LocalDateTime;

public class BidResponse {
    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDateTime getBidTime() {
        return bidTime;
    }

    public void setBidTime(LocalDateTime bidTime) {
        this.bidTime = bidTime;
    }

    private String companyName;
    private Double amount;
    private LocalDateTime bidTime;

    public BidResponse(String companyName, Double amount, LocalDateTime bidTime) {
        this.companyName = companyName;
        this.amount = amount;
        this.bidTime = bidTime;
    }

    // Getters
}
