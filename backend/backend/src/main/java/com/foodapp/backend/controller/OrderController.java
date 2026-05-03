package com.foodapp.backend.controller;

import com.foodapp.backend.entity.*;
import com.foodapp.backend.service.OrderService;
import com.foodapp.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService service;

    @Autowired
    private UserService userService;

    @PostMapping("/place/{userId}")
    public Order placeOrder(@PathVariable Long userId){
        User user = userService.getUserById(userId);
        return service.placeOrder(user);
    }

    @GetMapping("/{userId}")
    public List<Order> getOrders(@PathVariable Long userId){
        User user = userService.getUserById(userId);
        return service.getUserOrders(user);
    }
}