package com.BrodyT159.Secure_file_storage.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.BrodyT159.Secure_file_storage.model.FileMetadata;
import com.BrodyT159.Secure_file_storage.model.User; // <-- Add this import

@Repository
public interface FileMetadataRepository extends JpaRepository<FileMetadata, Long> {

    // Add this method
    List<FileMetadata> findByOwner(User owner);
}