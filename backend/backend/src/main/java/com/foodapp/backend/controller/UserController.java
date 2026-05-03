package com.foodapp.backend.controller;

import com.foodapp.backend.entity.User;
import com.foodapp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id){
        return service.getUserById(id);
    }
}