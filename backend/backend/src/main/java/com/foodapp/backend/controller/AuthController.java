package com.foodapp.backend.controller;

import com.foodapp.backend.dto.*;
import com.foodapp.backend.entity.User;
import com.foodapp.backend.security.JwtUtil;
import com.foodapp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public User register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request){

        User user = userService.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // simple password check (for now)
        if(!user.getPassword().equals(request.getPassword())){
            throw new RuntimeException("Invalid password");
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return new AuthResponse(token, user.getId(), user.getRole().name());
    }
}