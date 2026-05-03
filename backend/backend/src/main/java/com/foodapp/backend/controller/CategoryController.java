package com.foodapp.backend.controller;

import com.foodapp.backend.entity.Category;
import com.foodapp.backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryController {

    @Autowired
    private CategoryService service;

    @PostMapping
    public Category add(@RequestBody Category category){
        return service.addCategory(category);
    }

    @GetMapping
    public List<Category> getAll(){
        return service.getAll();
    }
}