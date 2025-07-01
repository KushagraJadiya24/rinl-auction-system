package com.rinl.auction_system.controller;

import com.rinl.auction_system.dto.BidRequest;
import com.rinl.auction_system.dto.BidResponse;
import com.rinl.auction_system.model.*;
import com.rinl.auction_system.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.transaction.Transactional;
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

    @Transactional
    @GetMapping("/auction/{auctionId}")
    public List<BidResponse> getBidsForAuction(@PathVariable Long auctionId) {
        Auction auction = auctionRepository.findById(auctionId)
                .orElseThrow(() -> new RuntimeException("Auction not found"));

        List<Bid> bids = bidRepository.findByAuction(auction);

        if (bids.isEmpty()) return List.of();

        // Sort bids based on auction type
        if ("HIGHEST".equalsIgnoreCase(auction.getType())) {
            bids.sort((a, b) -> Double.compare(b.getAmount(), a.getAmount()));
        } else {
            bids.sort((a, b) -> Double.compare(a.getAmount(), b.getAmount()));
        }

        Long winningCompanyId = null;

        if (auction.isClosed()) {

            winningCompanyId = bids.get(0).getCompany().getId();
            System.out.println("Winner: " + winningCompanyId);

            // ✅ Only update if necessary
            if (auction.getWinnerCompanyId() == null || !auction.getWinnerCompanyId().equals(winningCompanyId)) {
                auction.setWinnerCompanyId(winningCompanyId);
                auctionRepository.save(auction);
                auctionRepository.flush(); // 💾 Force DB update
            }
        }

        Long finalWinningCompanyId = winningCompanyId;

        return bids.stream()
                .map(bid -> new BidResponse(
                        bid.getCompany().getId(),
                        bid.getCompany().getName(),
                        bid.getAmount(),
                        bid.getBidTime(),
                        finalWinningCompanyId != null && finalWinningCompanyId.equals(bid.getCompany().getId())
                ))
                .collect(Collectors.toList());
    }

}
