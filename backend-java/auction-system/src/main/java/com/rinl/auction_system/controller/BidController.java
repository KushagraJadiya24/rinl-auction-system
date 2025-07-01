package com.rinl.auction_system.controller;

import com.rinl.auction_system.dto.BidRequest;
import com.rinl.auction_system.dto.BidResponse;
import com.rinl.auction_system.model.*;
import com.rinl.auction_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/bids")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class BidController {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping("/auction/{auctionId}")
    public String placeBid(@PathVariable Long auctionId, @RequestBody BidRequest request) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("Auction not found"));

        Company company = companyRepository.findById(request.getCompanyId())
                .orElseThrow(() -> new RuntimeException("Company not found"));

        Bid bid = new Bid(request.getAmount(), LocalDateTime.now(), auction, company);
        bidRepository.save(bid);

        return "Bid placed successfully!";
    }

    @GetMapping("/auction/{auctionId}")
    public List<BidResponse> getBidsForAuction(@PathVariable Long auctionId) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("Auction not found"));

        List<Bid> bids = bidRepository.findByAuctionOrderByBidTimeDesc(auction);

        return bids.stream()
                .map(bid -> new BidResponse(
                        bid.getCompany().getName(),
                        bid.getAmount(),
                        bid.getBidTime()
                ))
                .collect(Collectors.toList());
    }
}
