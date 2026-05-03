package com.foodapp.backend.controller;

import com.foodapp.backend.entity.Cart;
import com.foodapp.backend.entity.CartItem;
import com.foodapp.backend.entity.FoodItem;
import com.foodapp.backend.entity.User;
import com.foodapp.backend.service.CartService;
import com.foodapp.backend.service.UserService;
import com.foodapp.backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @Autowired
    private FoodService foodService;

    // =========================
    // ADD ITEM TO CART
    // =========================
    @PostMapping("/add")
    public CartItem addToCart(@RequestParam Long userId,
                              @RequestParam Long foodId,
                              @RequestParam int quantity) {

        // Get user
        User user = userService.getUserById(userId);

        // Get or create cart
        Cart cart = cartService.getCart(user);

        // Get real food item from DB (IMPORTANT FIX)
        FoodItem foodItem = foodService.getFoodItemById(foodId);

        // Add to cart
        return cartService.addToCart(cart, foodItem, quantity);
    }

    // =========================
    // VIEW CART
    // =========================
    @GetMapping("/{userId}")
    public List<CartItem> viewCart(@PathVariable Long userId) {

        User user = userService.getUserById(userId);

        Cart cart = cartService.getCart(user);

        return cartService.getItems(cart);
    }

    // =========================
    // REMOVE ITEM FROM CART
    // (GOOD FOR MARKS)
    // =========================
    @DeleteMapping("/remove/{cartItemId}")
    public String removeFromCart(@PathVariable Long cartItemId) {

        cartService.removeItem(cartItemId);

        return "Item removed from cart successfully";
    }

    // =========================
    // CLEAR CART
    // =========================
    @DeleteMapping("/clear/{userId}")
    public String clearCart(@PathVariable Long userId) {

        User user = userService.getUserById(userId);

        Cart cart = cartService.getCart(user);

        cartService.clearCart(cart);

        return "Cart cleared successfully";
    }
}