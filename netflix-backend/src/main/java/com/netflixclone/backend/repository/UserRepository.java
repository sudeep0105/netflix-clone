package com.netflixclone.backend.repository;

import com.netflixclone.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Custom query to verify if an email registration attempt already exists
    Optional<User> findByEmail(String email);
}