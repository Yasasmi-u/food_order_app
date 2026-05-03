package com.foodapp.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private double price;

    @Enumerated(EnumType.STRING)
    private FoodStatus status;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    private String imageUrl;
}