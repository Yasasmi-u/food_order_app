package com.foodapp.backend.service;

import com.foodapp.backend.entity.*;
import com.foodapp.backend.repository.OrderItemRepository;
import com.foodapp.backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderItemRepository itemRepo;

    public Order placeOrder(User user){
        Order order = new Order();
        order.setUser(user);
        order.setStatus(OrderStatus.PLACED);

        return orderRepo.save(order);
    }

    public List<Order> getUserOrders(User user){
        return orderRepo.findByUser(user);
    }

    public OrderItem addOrderItem(Order order, FoodItem food, int qty){
        OrderItem item = new OrderItem();
        item.setOrder(order);
        item.setFoodItem(food);
        item.setQuantity(qty);

        return itemRepo.save(item);
    }
}