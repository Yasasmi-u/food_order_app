package com.foodapp.backend.service;

import com.foodapp.backend.entity.*;
import com.foodapp.backend.repository.CartItemRepository;
import com.foodapp.backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepo;

    @Autowired
    private CartItemRepository itemRepo;

    // =========================
    // GET OR CREATE CART
    // =========================
        public Cart getCart(User user) {
            return cartRepo.findByUser(user)
                    .orElseGet(() -> {
                        Cart newCart = new Cart();
                        newCart.setUser(user);
                        return cartRepo.save(newCart);
                    });
        }

    // =========================
    // ADD ITEM TO CART
    // =========================
    public CartItem addToCart(Cart cart, FoodItem food, int qty){
        CartItem item = new CartItem();
        item.setCart(cart);
        item.setFoodItem(food);
        item.setQuantity(qty);

        return itemRepo.save(item);
    }

    // =========================
    // VIEW ITEMS
    // =========================
    public List<CartItem> getItems(Cart cart){
        return itemRepo.findByCart(cart);
    }

    // =========================
    // REMOVE ITEM (FIXED)
    // =========================
    public void removeItem(Long cartItemId){
        CartItem item = itemRepo.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        itemRepo.delete(item);
    }

    // =========================
    // CLEAR CART
    // =========================
    public void clearCart(Cart cart){
        List<CartItem> items = itemRepo.findByCart(cart);
        itemRepo.deleteAll(items);
    }
}