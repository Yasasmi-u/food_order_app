package com.foodapp.backend.controller;

import com.foodapp.backend.entity.Category;
import com.foodapp.backend.service.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing food categories.
 */
@Slf4j
@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService service;

    /**
     * Adds a new category.
     * @param category The category to add.
     * @return The saved category.
     */
    @PostMapping
    public Category add(@RequestBody Category category){
        log.info("Adding new category: {}", category.getName());
        return service.addCategory(category);
    }

    /**
     * Retrieves all categories.
     * @return List of all categories.
     */
    @GetMapping
    public List<Category> getAll(){
        log.info("Fetching all categories");
        return service.getAll();
    }
}