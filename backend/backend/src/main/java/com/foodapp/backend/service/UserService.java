package com.foodapp.backend.service;

import com.foodapp.backend.entity.User;
import com.foodapp.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public User register(User user){
        return repo.save(user);
    }

    public Optional<User> findByUsername(String username){
        return repo.findByUsername(username);
    }

    public User getUserById(Long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }
}