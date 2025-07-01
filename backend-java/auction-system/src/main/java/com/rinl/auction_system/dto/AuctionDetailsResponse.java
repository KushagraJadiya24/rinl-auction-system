// src/main/java/com/rinl/auction_system/dto/AuctionDetailsResponse.java

package com.rinl.auction_system.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class AuctionDetailsResponse {
    private Long auctionId;
    private String itemName;
    private String type;
    private int quantity;
    private BigDecimal startingPrice;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private boolean isClosed;
    private List<BidInfo> bidders;

    public static class BidInfo {
        private String companyName;
        private BigDecimal bidAmount;
        private LocalDateTime bidTime;

        public BidInfo(String companyName, BigDecimal bidAmount, LocalDateTime bidTime) {
            this.companyName = companyName;
            this.bidAmount = bidAmount;
            this.bidTime = bidTime;
        }

        // Getters
        public String getCompanyName() { return companyName; }
        public BigDecimal getBidAmount() { return bidAmount; }
        public LocalDateTime getBidTime() { return bidTime; }
    }

    // Constructor
    public AuctionDetailsResponse(Long auctionId, String itemName, String type, int quantity, BigDecimal startingPrice,
                                  LocalDateTime startTime, LocalDateTime endTime, boolean isClosed, List<BidInfo> bidders) {
        this.auctionId = auctionId;
        this.itemName = itemName;
        this.type = type;
        this.quantity = quantity;
        this.startingPrice = startingPrice;
        this.startTime = startTime;
        this.endTime = endTime;
        this.isClosed = isClosed;
        this.bidders = bidders;
    }

    // Getters
    public Long getAuctionId() { return auctionId; }
    public String getItemName() { return itemName; }
    public String getType() { return type; }
    public int getQuantity() { return quantity; }
    public BigDecimal getStartingPrice() { return startingPrice; }
    public LocalDateTime getStartTime() { return startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public boolean isClosed() { return isClosed; }
    public List<BidInfo> getBidders() { return bidders; }
}
