package com.foodapp.backend.controller;

import com.foodapp.backend.dto.*;
import com.foodapp.backend.entity.User;
import com.foodapp.backend.security.JwtUtil;
import com.foodapp.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for handling authentication requests like Signup and Login.
 */
@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Registers a new user.
     * @param user The user details to register.
     * @return The registered user.
     */
    @PostMapping("/signup")
    public User register(@RequestBody User user){
        log.info("Registering new user: {}", user.getUsername());
        return userService.register(user);
    }

    /**
     * Authenticates a user and returns a JWT token.
     * @param request The login credentials.
     * @return AuthResponse containing the token and user details.
     */
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request){
        log.info("Login attempt for user: {}", request.getUsername());

        User user = userService.findByUsername(request.getUsername())
                .orElseThrow(() -> {
                    log.error("Login failed: User not found - {}", request.getUsername());
                    return new RuntimeException("User not found");
                });

        // simple password check (for now)
        if(!user.getPassword().equals(request.getPassword())){
            log.error("Login failed: Invalid password for user - {}", request.getUsername());
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getUsername());
        log.info("Login successful for user: {}. Token generated.", request.getUsername());

        return new AuthResponse(token, user.getId(), user.getRole().name());
    }
}