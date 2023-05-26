package com.skyforger.goods.controller;

import com.skyforger.goods.model.User;
import com.skyforger.goods.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/view")
    public List<User> viewAllUsers(){
        System.out.printf("users");
        return userService.getAllUsers();
    }


}
