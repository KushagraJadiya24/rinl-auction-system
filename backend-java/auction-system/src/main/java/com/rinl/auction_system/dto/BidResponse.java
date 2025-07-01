package com.rinl.auction_system.dto;

import java.time.LocalDateTime;

public class BidResponse {

    private Long companyId;
    private String companyName;
    private double amount;
    private LocalDateTime bidTime;
    private boolean isWinner;

    public BidResponse(Long companyId, String companyName, double amount, LocalDateTime bidTime, boolean isWinner) {
        this.companyId = companyId;
        this.companyName = companyName;
        this.amount = amount;
        this.bidTime = bidTime;
        this.isWinner = isWinner;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public LocalDateTime getBidTime() {
        return bidTime;
    }

    public void setBidTime(LocalDateTime bidTime) {
        this.bidTime = bidTime;
    }

    public boolean isWinner() {
        return isWinner;
    }

    public void setWinner(boolean winner) {
        isWinner = winner;
    }
}
