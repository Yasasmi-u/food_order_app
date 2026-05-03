package com.foodapp.backend.service;

import com.foodapp.backend.entity.*;
import com.foodapp.backend.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository repo;

    public Payment createPayment(Order order){
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setStatus(PaymentStatus.PENDING);

        return repo.save(payment);
    }

    public Optional<Payment> getByOrder(Order order){
        return repo.findByOrder(order);
    }
}