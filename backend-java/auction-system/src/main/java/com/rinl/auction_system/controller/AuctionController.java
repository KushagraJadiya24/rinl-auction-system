package com.rinl.auction_system.controller;

import com.rinl.auction_system.dto.AuctionRequest;
import com.rinl.auction_system.dto.AuctionResponse;
import com.rinl.auction_system.model.Auction;
import com.rinl.auction_system.model.AuctionType;
import com.rinl.auction_system.model.Inventory;
import com.rinl.auction_system.repository.AuctionRepository;
import com.rinl.auction_system.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;


import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/auctions")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuctionController {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    private InventoryRepository inventoryRepository;

    @PostMapping
    public Auction createAuction(@RequestBody AuctionRequest request) {
        try {
            LocalDateTime start = LocalDateTime.parse(request.getStartTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);
            LocalDateTime end = LocalDateTime.parse(request.getEndTime(), DateTimeFormatter.ISO_LOCAL_DATE_TIME);

            if (end.isBefore(start)) {
                throw new RuntimeException("End time must be after start time");
            }

            Inventory inventory = inventoryRepository.findById(request.getItemId())
                    .orElseThrow(() -> new RuntimeException("Inventory item not found"));

            Auction auction = new Auction();
            auction.setItem(inventory);
            auction.setType(request.getType().toUpperCase());
            auction.setQuantity(request.getQuantity());
            auction.setBasePrice(request.getStartingPrice());
            auction.setStartTime(start);
            auction.setEndTime(end);
            auction.setClosed(false);

            return auctionRepository.save(auction);

        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid auction type: " + request.getType());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error creating auction: " + e.getMessage());
        }
    }


    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuctionResponse> getAuctionById(@PathVariable Long id) {
        Optional<Auction> auctionOpt = auctionRepository.findById(id);
        if (auctionOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Auction auction = auctionOpt.get();
        AuctionResponse response = new AuctionResponse(auction);
        return ResponseEntity.ok(response);
    }




    @GetMapping("/active")
    public List<AuctionResponse> getActiveAuctions() {
        return auctionRepository.findByIsClosedFalse()
                .stream()
                .map(AuctionResponse::new)
                .toList();
    }
}
