package com.rinl.auction_system.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "auctions")
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auction_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "item_id", nullable = false)
    private Inventory item;

    @Enumerated(EnumType.STRING)
    @Column(name = "auction_type", nullable = false)
    private AuctionType type;

    @Column(nullable = false)
    private int quantity;

    @Column(name = "base_price", nullable = false)
    private Double basePrice;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Column(name = "start_time", nullable = false)
    private LocalDateTime startTime;

    @Column(name = "is_closed", nullable = false)
    private boolean isClosed;

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public Inventory getItem() {
        return item;
    }

    public void setItem(Inventory item) {
        this.item = item;
    }

    public AuctionType getType() {
        return type;
    }

    public void setType(AuctionType type) {
        this.type = type;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Double getBasePrice() {
        return basePrice;
    }

    public void setBasePrice(Double basePrice) {
        this.basePrice = basePrice;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public boolean isClosed() {
        return isClosed;
    }

    public void setClosed(boolean closed) {
        isClosed = closed;
    }
}
