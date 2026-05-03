package com.foodapp.backend.controller;

import com.foodapp.backend.entity.*;
import com.foodapp.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService service;


    @PostMapping("/{orderId}")
    public Payment pay(@PathVariable Long orderId){

        Order order = new Order();
        order.setId(orderId); // simple reference

        return service.createPayment(order);
    }
}