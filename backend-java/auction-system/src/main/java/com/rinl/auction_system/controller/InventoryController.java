// controller/InventoryController.java
package com.rinl.auction_system.controller;

import com.rinl.auction_system.dto.InventoryRequest;
import com.rinl.auction_system.model.Inventory;
import com.rinl.auction_system.repository.InventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryRepository inventoryRepo;

    // GET all inventory
    @GetMapping
    public List<Inventory> getAllInventory() {
        return inventoryRepo.findAll();
    }

    // POST - add new item
    @PostMapping
    public Inventory addInventory(@RequestBody InventoryRequest request) {
        Inventory item = new Inventory();
        item.setItem_name(request.item_name);
        item.setDescription(request.description);
        item.setImage_url(request.image_url);
        item.setQuantity(request.quantity);
        item.setCreated_by_admin_id(request.created_by_admin_id); // Assume frontend sends admin_id
        return inventoryRepo.save(item);
    }
}
