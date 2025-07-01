package com.rinl.auction_system.dto;

import jakarta.validation.constraints.*;

public class AuctionRequest {

    @NotNull
    private Integer itemId;

    @NotBlank
    private String type;

    @NotNull
    @Positive
    private Double startingPrice;

    @NotBlank
    private String endTime;

    @Min(1)
    private int quantity;

    @NotBlank
    private String startTime;

    // Getters and setters
    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }
    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Double getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(Double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
