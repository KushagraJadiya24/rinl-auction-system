package com.rinl.auction_system.repository;

import com.rinl.auction_system.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Optional<Company> findByEmail(String email); // Add this line
}
