package com.BrodyT159.Secure_file_storage.repository;

import com.BrodyT159.Secure_file_storage.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional; // <-- Add this import

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Add this method
    Optional<User> findByUsername(String username);
}