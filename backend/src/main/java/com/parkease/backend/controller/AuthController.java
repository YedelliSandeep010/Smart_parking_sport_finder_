package com.parkease.backend.controller;

import com.parkease.backend.model.User;
import com.parkease.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already registered"));
        }
        if (user.getId() == null) {
            user.setId(String.valueOf(System.currentTimeMillis()));
        }
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        String role = credentials.get("role");

        if ("admin".equals(role)) {
            String ADMIN_TOKEN = "PARK-ADMIN-2025";
            if (ADMIN_TOKEN.equals(password)) {
                User admin = new User("ADMIN-001", "Administrator", email, password, "admin", null, null);
                return ResponseEntity.ok(admin);
            } else {
                return ResponseEntity.badRequest().body(Map.of("message", "Invalid Admin Token"));
            }
        }

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)
                && userOpt.get().getRole().equals(role)) {
            return ResponseEntity.ok(userOpt.get());
        }

        return ResponseEntity.badRequest().body(Map.of("message", "Invalid credentials or role"));
    }
}
