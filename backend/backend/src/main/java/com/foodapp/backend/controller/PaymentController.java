package com.foodapp.backend.controller;

import com.foodapp.backend.entity.*;
import com.foodapp.backend.service.PaymentService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * Controller for handling payment-related requests.
 */
@Slf4j
@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService service;

    /**
     * Executes a payment for an order.
     * @param orderId The ID of the order to pay for.
     * @return The resulting payment record.
     */
    @PostMapping("/{orderId}")
    public Payment pay(@PathVariable Long orderId){
        log.info("Received payment request for Order ID: {}", orderId);

        Order order = new Order();
        order.setId(orderId);

        return service.processPayment(order);
    }
}