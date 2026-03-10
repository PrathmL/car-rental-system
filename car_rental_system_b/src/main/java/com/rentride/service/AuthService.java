package com.rentride.service;

import com.rentride.dto.Dtos.AuthRequest;
import com.rentride.dto.Dtos.RegisterRequest;
import com.rentride.entity.Role;
import com.rentride.entity.User;
import com.rentride.entity.UserStatus;
import com.rentride.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerUser(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already taken!");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.valueOf(request.getRole().toUpperCase()));
        user.setStatus(UserStatus.ACTIVE);

        return userRepository.save(user);
    }

    public User loginUser(AuthRequest request) {
        System.out.println("Login Attempt for: " + request.getEmail());
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> {
                    System.out.println("Login Failed: User not found");
                    return new RuntimeException("Invalid email or password");
                });

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            System.out.println("Login Failed: Password mismatch");
            throw new RuntimeException("Invalid email or password");
        }

        if (user.getStatus() == UserStatus.BLOCKED) {
            System.out.println("Login Failed: Account blocked");
            throw new RuntimeException("Account is blocked.");
        }

        System.out.println("Login Success for: " + user.getName() + " with role: " + user.getRole());
        return user;
    }
}
