package com.foodapp.backend.controller;

import com.foodapp.backend.entity.*;
import com.foodapp.backend.service.OrderService;
import com.foodapp.backend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for handling order-related operations.
 */
@Slf4j
@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService service;

    @Autowired
    private UserService userService;

    /**
     * Places a new order for the specified user from their cart.
     * @param userId The ID of the user placing the order.
     * @return The created order.
     */
    @PostMapping("/place/{userId}")
    public Order placeOrder(@PathVariable Long userId){
        log.info("Placing order for user ID: {}", userId);
        User user = userService.getUserById(userId);
        return service.placeOrder(user);
    }

    /**
     * Retrieves all orders for a specific user.
     * @param userId The ID of the user.
     * @return List of user orders.
     */
    @GetMapping("/{userId}")
    public List<Order> getOrders(@PathVariable Long userId){
        log.info("Fetching orders for user ID: {}", userId);
        User user = userService.getUserById(userId);
        return service.getUserOrders(user);
    }
}