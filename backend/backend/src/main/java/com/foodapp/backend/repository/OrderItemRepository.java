package com.foodapp.backend.repository;

import com.foodapp.backend.entity.OrderItem;
import com.foodapp.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {

    List<OrderItem> findByOrder(Order order);
}