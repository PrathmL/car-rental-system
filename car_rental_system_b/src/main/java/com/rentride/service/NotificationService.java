package com.rentride.service;

import com.rentride.entity.Notification;
import com.rentride.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(Long userId, String message, String type) {
        Notification note = new Notification();
        note.setUserId(userId);
        note.setMessage(message);
        note.setType(type);
        notificationRepository.save(note);
    }

    public List<Notification> getNotificationsForUser(Long userId) {
        return notificationRepository.findByUserIdAndIsReadFalseOrderByTimestampDesc(userId);
    }

    public void markAsRead(Long id) {
        notificationRepository.findById(id).ifPresent(note -> {
            note.setRead(true);
            notificationRepository.save(note);
        });
    }
}
