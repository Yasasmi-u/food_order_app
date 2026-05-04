package com.foodapp.backend.controller;

import com.foodapp.backend.entity.FoodItem;
import com.foodapp.backend.service.FoodService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing food items.
 */
@Slf4j
@RestController
@RequestMapping("/foods")
public class FoodController {

    @Autowired
    private FoodService service;

    /**
     * Adds a new food item.
     * @param food The food item to add.
     * @return The saved food item.
     */
    @PostMapping
    public FoodItem add(@RequestBody FoodItem food){
        log.info("Adding new food item: {}", food.getName());
        return service.addFood(food);
    }

    /**
     * Retrieves all food items.
     * @return List of all food items.
     */
    @GetMapping
    public List<FoodItem> getAll(){
        log.info("Fetching all food items");
        return service.getAll();
    }

    /**
     * Retrieves food items by category ID.
     * @param id The ID of the category.
     * @return List of food items in that category.
     */
    @GetMapping("/category/{id}")
    public List<FoodItem> getByCategory(@PathVariable Long id){
        log.info("Fetching food items for category ID: {}", id);
        return service.getByCategory(id);
    }
}