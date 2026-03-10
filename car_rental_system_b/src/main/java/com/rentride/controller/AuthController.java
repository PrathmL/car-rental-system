package com.rentride.controller;

import com.rentride.entity.User;
import com.rentride.entity.UserStatus;
import com.rentride.entity.Role;
import com.rentride.repository.UserRepository;
import com.rentride.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam("phone") String phone,
            @RequestParam("password") String password,
            @RequestParam("role") String role,
            @RequestParam("securityQuestion") String securityQuestion,
            @RequestParam("securityAnswer") String securityAnswer,
            @RequestParam("document") MultipartFile document) {

        String normalizedEmail = email.toLowerCase().trim();

        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            return ResponseEntity.badRequest().body("Email already registered!");
        }

        try {
            String fileName = UUID.randomUUID().toString() + "_" + document.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, document.getBytes());

            User user = new User();
            user.setName(name);
            user.setEmail(normalizedEmail);
            user.setPhone(phone);
            user.setPassword(passwordEncoder.encode(password.trim())); // Encode password
            user.setRole(Role.valueOf(role.toUpperCase()));
            user.setStatus(UserStatus.PENDING);
            user.setDocumentUrl("/uploads/" + fileName);
            user.setSecurityQuestion(securityQuestion);
            user.setSecurityAnswer(securityAnswer.toLowerCase().trim());

            userRepository.save(user);

            // Notify all Admins about new registration
            userRepository.findAll().stream()
                .filter(u -> u.getRole() == Role.ADMIN)
                .forEach(admin -> {
                    notificationService.createNotification(
                        admin.getId(), 
                        "New " + user.getRole() + " registration request from " + user.getName(), 
                        "USER_REGISTRATION_REQUEST"
                    );
                });

            return ResponseEntity.ok("Registration successful. Waiting for admin approval.");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading file.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email").toLowerCase().trim();
        String password = credentials.get("password").trim();

        return userRepository.findByEmail(email)
                .map(user -> {
                    // Use passwordEncoder to match the raw password with the encoded one
                    if (passwordEncoder.matches(password, user.getPassword())) {
                        if (user.getStatus() == UserStatus.PENDING) {
                            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("PENDING_APPROVAL");
                        }
                        return ResponseEntity.ok(user);
                    }
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found"));
    }

    @GetMapping("/security-question/{email}")
    public ResponseEntity<?> getSecurityQuestion(@PathVariable String email) {
        return userRepository.findByEmail(email.toLowerCase().trim())
                .<ResponseEntity<?>>map(user -> ResponseEntity.ok(Map.of("question", user.getSecurityQuestion())))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email").toLowerCase().trim();
        String answer = request.get("answer").toLowerCase().trim();
        String newPassword = request.get("newPassword").trim();

        return userRepository.findByEmail(email)
                .map(user -> {
                    if (user.getSecurityAnswer().equals(answer)) {
                        user.setPassword(passwordEncoder.encode(newPassword)); // Encode new password
                        userRepository.save(user);
                        return ResponseEntity.ok("Password reset successful.");
                    }
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect security answer.");
                })
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found"));
    }

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        return ResponseEntity.ok(userRepository.findByEmail(email.toLowerCase().trim()).isPresent());
    }

    @GetMapping("/check-phone")
    public ResponseEntity<Boolean> checkPhone(@RequestParam String phone) {
        return ResponseEntity.ok(userRepository.findByPhone(phone.trim()).isPresent());
    }
}
