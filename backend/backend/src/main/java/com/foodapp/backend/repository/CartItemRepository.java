package com.foodapp.backend.repository;

import com.foodapp.backend.entity.CartItem;
import com.foodapp.backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByCart(Cart cart);
}