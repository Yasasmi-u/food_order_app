package com.foodapp.backend.repository;

import com.foodapp.backend.entity.FoodItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository extends JpaRepository<FoodItem, Long> {

    List<FoodItem> findByCategoryId(Long categoryId);

    List<FoodItem> findByStatus(String status);
}