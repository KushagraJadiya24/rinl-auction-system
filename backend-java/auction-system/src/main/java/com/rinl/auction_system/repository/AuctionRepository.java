package com.rinl.auction_system.repository;

import com.rinl.auction_system.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface AuctionRepository extends JpaRepository<Auction, Long> {
    List<Auction> findByIsClosedFalse();
}