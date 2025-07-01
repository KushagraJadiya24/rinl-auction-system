package com.rinl.auction_system.dto;

import com.rinl.auction_system.model.Auction;

public class AuctionResponse {
    private Long id;
    private String item_name;
    private int quantity;
    private String type;
    private Double currentBid;
    private Double startingPrice;
    private String endTime;
    private String startTime;

    public AuctionResponse(Auction auction) {
        this.id = auction.getId();
        this.item_name = auction.getItem().getItem_name(); // ✅ nested flatten
        this.quantity = auction.getQuantity();
        this.type = auction.getType().name();
        this.currentBid = auction.getBasePrice();      // ✅ matches getBasePrice()
        this.startingPrice = auction.getBasePrice();   // ✅ not getStartingPrice()
        this.endTime = auction.getEndTime().toString();
        this.startTime = auction.getStartTime().toString();
    }

    // Getters
    public Long getId() { return id; }
    public String getItem_name() { return item_name; }
    public int getQuantity() { return quantity; }
    public String getType() { return type; }
    public Double getCurrentBid() { return currentBid; }
    public Double getStartingPrice() { return startingPrice; }
    public String getEndTime() { return endTime; }
    public String getStartTime() { return startTime; }
}
