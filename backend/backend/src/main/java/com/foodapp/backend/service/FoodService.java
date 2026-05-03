package com.foodapp.backend.service;

import com.foodapp.backend.entity.FoodItem;
import com.foodapp.backend.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository repo;

    public FoodItem addFood(FoodItem food){
        return repo.save(food);
    }

    public List<FoodItem> getAll(){
        return repo.findAll();
    }

    public List<FoodItem> getByCategory(Long categoryId){
        return repo.findByCategoryId(categoryId);
    }

    public FoodItem getFoodItemById(Long id){
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Food item not found with id: " + id));
    }
}