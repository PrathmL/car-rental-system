package com.rentride.service;

import com.rentride.entity.Role;
import com.rentride.entity.User;
import com.rentride.entity.UserStatus;
import com.rentride.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Check if Admin exists, if not, create one
        if (!userRepository.existsByEmail("admin@gmail.com")) {
            User admin = new User();
            admin.setName("System Admin");
            admin.setEmail("admin@gmail.com");
            admin.setPhone("9999999999");
            admin.setPassword(passwordEncoder.encode("admin123")); // Encrypts admin123
            admin.setRole(Role.ADMIN);
            admin.setStatus(UserStatus.ACTIVE);
            admin.setDocumentUrl(null);
            
            userRepository.save(admin);
            System.out.println(">>> Default Admin Account Created: admin@gmail.com / admin123");
        }
    }
}
