package com.rinl.auction_system.service;

import com.rinl.auction_system.model.Auction;
import com.rinl.auction_system.repository.AuctionRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuctionService {

    private final AuctionRepository auctionRepository;

    public AuctionService(AuctionRepository auctionRepository) {
        this.auctionRepository = auctionRepository;
    }

    @Scheduled(fixedRate = 60000) // every 60 seconds
    @Transactional
    public void closeExpiredAuctions() {
        List<Auction> activeAuctions = auctionRepository.findByIsClosedFalse();

        for (Auction auction : activeAuctions) {
            if (auction.getEndTime().isBefore(LocalDateTime.now())) {
                auction.setClosed(true);
                auctionRepository.save(auction);
                System.out.println("Closed auction ID: " + auction.getId());
            }
        }
    }
}
