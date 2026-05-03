package com.foodapp.backend.controller;

import com.foodapp.backend.entity.FoodItem;
import com.foodapp.backend.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/foods")
public class FoodController {

    @Autowired
    private FoodService service;

    @PostMapping
    public FoodItem add(@RequestBody FoodItem food){
        return service.addFood(food);
    }

    @GetMapping
    public List<FoodItem> getAll(){
        return service.getAll();
    }

    @GetMapping("/category/{id}")
    public List<FoodItem> getByCategory(@PathVariable Long id){
        return service.getByCategory(id);
    }
}