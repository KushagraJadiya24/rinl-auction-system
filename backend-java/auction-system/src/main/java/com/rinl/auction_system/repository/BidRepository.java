package com.rinl.auction_system.repository;

import com.rinl.auction_system.model.Bid;
import com.rinl.auction_system.model.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findByAuctionOrderByBidTimeDesc(Auction auction);
}
