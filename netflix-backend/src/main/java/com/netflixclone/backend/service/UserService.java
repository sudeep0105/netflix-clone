package com.netflixclone.backend.service;

import com.netflixclone.backend.model.User;
import com.netflixclone.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerNewUser(User user) {
        // Business logic constraint validation
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("An account is already registered with this email address!");
        }

        // Save the structured payload straight into MySQL
        return userRepository.save(user);
    }
}