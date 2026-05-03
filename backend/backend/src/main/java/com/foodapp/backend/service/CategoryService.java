package com.foodapp.backend.service;

import com.foodapp.backend.entity.Category;
import com.foodapp.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repo;

    public Category addCategory(Category category){
        return repo.save(category);
    }

    public List<Category> getAll(){
        return repo.findAll();
    }
}