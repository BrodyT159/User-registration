package com.BrodyT159.Secure_file_storage.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping; // <-- Add this import
import org.springframework.web.bind.annotation.RequestMapping; // <-- Add this import
import org.springframework.web.bind.annotation.RequestParam; // <-- Add this import
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.BrodyT159.Secure_file_storage.dto.FileDetailDTO;
import com.BrodyT159.Secure_file_storage.model.FileMetadata;
import com.BrodyT159.Secure_file_storage.model.User;
import com.BrodyT159.Secure_file_storage.repository.FileMetadataRepository; // <-- Add this import
import com.BrodyT159.Secure_file_storage.repository.UserRepository; // <-- Add this import
import com.BrodyT159.Secure_file_storage.service.FileStorageService; // <-- Add this import

@RestController
@RequestMapping("/api/files")
public class FileUploadController {

    private final FileStorageService fileStorageService;
    private final FileMetadataRepository fileMetadataRepository;
    private final UserRepository userRepository;

    public FileUploadController(FileStorageService fileStorageService,
                                FileMetadataRepository fileMetadataRepository,
                                UserRepository userRepository) {
        this.fileStorageService = fileStorageService;
        this.fileMetadataRepository = fileMetadataRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Store the file on the server
        String fileName = fileStorageService.storeFile(file);

        // Create and save the file metadata
        FileMetadata metadata = new FileMetadata();
        metadata.setFileName(fileName);
        metadata.setFileType(file.getContentType());
        metadata.setSize(file.getSize());
        metadata.setUploadTimestamp(LocalDateTime.now());
        metadata.setOwner(currentUser);

        fileMetadataRepository.save(metadata);

        return ResponseEntity.ok("File uploaded successfully: " + fileName);
    }

    @GetMapping
    public ResponseEntity<List<FileDetailDTO>> listFiles() {
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Find files by owner and convert them to DTOs
        List<FileDetailDTO> files = fileMetadataRepository.findByOwner(currentUser)
                .stream()
                .map(metadata -> new FileDetailDTO(
                        metadata.getId(),
                        metadata.getFileName(),
                        metadata.getFileType(),
                        metadata.getSize(),
                        metadata.getUploadTimestamp()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(files);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) {
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Find the file metadata
        FileMetadata metadata = fileMetadataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found with id " + id));

        // SECURITY CHECK: Make sure the logged-in user owns the file
        if (!metadata.getOwner().getUsername().equals(username)) {
            return ResponseEntity.status(403).build(); // Forbidden
        }

        // Load the file as a resource
        Resource resource = fileStorageService.loadFileAsResource(metadata.getFileName());

        // Build the response
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(metadata.getFileType()))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable Long id) {
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Find the file metadata
        FileMetadata metadata = fileMetadataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found with id " + id));

        // SECURITY CHECK: Make sure the logged-in user owns the file
        if (!metadata.getOwner().getUsername().equals(username)) {
            return ResponseEntity.status(403).build(); // Forbidden
        }

        // Delete the physical file
        fileStorageService.deleteFile(metadata.getFileName());

        // Delete the metadata from the database
        fileMetadataRepository.delete(metadata);

        return ResponseEntity.ok("File deleted successfully: " + metadata.getFileName());
    }
}