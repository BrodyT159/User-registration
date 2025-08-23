package com.BrodyT159.Secure_file_storage.dto;

import java.time.LocalDateTime;

public record FileDetailDTO(
    Long id,
    String fileName,
    String fileType,
    long size,
    LocalDateTime uploadTimestamp
) {
}