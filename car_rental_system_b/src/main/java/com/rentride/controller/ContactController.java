package com.rentride.controller;

import com.rentride.entity.ContactMessage;
import com.rentride.repository.ContactMessageRepository;
import com.rentride.service.NotificationService;
import com.rentride.repository.UserRepository;
import com.rentride.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> sendMessage(@RequestBody ContactMessage message) {
        ContactMessage saved = contactMessageRepository.save(message);

        // Notify all Admins
        userRepository.findAll().stream()
            .filter(u -> u.getRole() == Role.ADMIN)
            .forEach(admin -> {
                notificationService.createNotification(
                    admin.getId(), 
                    "New support message from " + message.getName(), 
                    "CONTACT_MESSAGE"
                );
            });

        return ResponseEntity.ok("Message sent successfully");
    }
}
