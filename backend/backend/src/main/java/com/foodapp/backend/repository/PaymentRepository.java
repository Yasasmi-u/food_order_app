package com.foodapp.backend.repository;

import com.foodapp.backend.entity.Payment;
import com.foodapp.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByOrder(Order order);
}