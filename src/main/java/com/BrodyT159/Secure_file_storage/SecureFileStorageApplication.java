package com.BrodyT159.Secure_file_storage;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SecureFileStorageApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecureFileStorageApplication.class, args);
	}

}
/*
 * 
 * 
Fully functional backend with:

User registration with secure password hashing.

A login system that returns a valid JWT.

A security filter that can validate JWTs on incoming requests.
 * 
 * 
 * ecure user registration and login

Modern, token-based authentication with JWTs

Protected endpoints

File uploading

Listing files for a specific user

File downloading with a security check
 * 
 */