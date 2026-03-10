package com.rentride.controller;

import com.rentride.entity.ChatMessage;
import com.rentride.repository.ChatMessageRepository;
import com.rentride.repository.BookingRepository;
import com.rentride.repository.CarRepository;
import com.rentride.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private NotificationService notificationService;

    @GetMapping("/{bookingId}")
    public List<ChatMessage> getMessages(@PathVariable Long bookingId) {
        return chatMessageRepository.findByBookingIdOrderByTimestampAsc(bookingId);
    }

    @PostMapping
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        ChatMessage saved = chatMessageRepository.save(message);

        // Find recipient and send notification
        bookingRepository.findById(message.getBookingId()).ifPresent(booking -> {
            carRepository.findById(booking.getCarId()).ifPresent(car -> {
                Long recipientId = message.getSenderId().equals(booking.getCustomerId()) 
                                   ? car.getOwnerId() 
                                   : booking.getCustomerId();
                
                notificationService.createNotification(
                    recipientId, 
                    "New message from " + message.getSenderName() + ": " + 
                    (message.getContent().length() > 30 ? message.getContent().substring(0, 30) + "..." : message.getContent()),
                    "CHAT_MESSAGE"
                );
            });
        });

        return saved;
    }
}
