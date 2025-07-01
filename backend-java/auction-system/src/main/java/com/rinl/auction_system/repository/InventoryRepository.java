// repository/InventoryRepository.java
package com.rinl.auction_system.repository;

import com.rinl.auction_system.model.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
}
