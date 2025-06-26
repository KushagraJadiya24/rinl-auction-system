package com.rinl.auction_system.repository;

import com.rinl.auction_system.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email); // useful for login

    Optional<Admin> findByUsername(String username);
}
