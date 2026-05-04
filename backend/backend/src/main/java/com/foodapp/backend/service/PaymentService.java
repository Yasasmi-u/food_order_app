package com.foodapp.backend.service;

import com.foodapp.backend.entity.*;
import com.foodapp.backend.repository.PaymentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service for managing payment transactions.
 */
@Slf4j
@Service
public class PaymentService {

    @Autowired
    private PaymentRepository repo;

    /**
     * Processes a payment for a specific order.
     * In a real system, this would integrate with a payment gateway.
     * @param order The order to pay for.
     * @return The processed payment.
     */
    public Payment processPayment(Order order){
        log.info("Processing payment for Order ID: {}", order.getId());
        
        // Check if payment already exists
        Optional<Payment> existing = repo.findByOrder(order);
        Payment payment = existing.orElse(new Payment());
        
        payment.setOrder(order);
        payment.setStatus(PaymentStatus.COMPLETED); // Simulating successful payment
        
        log.info("Payment successful for Order ID: {}. Status set to COMPLETED.", order.getId());
        return repo.save(payment);
    }

    public Optional<Payment> getByOrder(Order order){
        return repo.findByOrder(order);
    }
}