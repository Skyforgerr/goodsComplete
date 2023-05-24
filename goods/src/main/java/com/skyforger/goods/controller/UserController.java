package com.skyforger.goods.controller;

import com.skyforger.goods.model.Good;
import com.skyforger.goods.model.User;
import com.skyforger.goods.repository.GoodRepository;
import com.skyforger.goods.requests.CartRequest;
import com.skyforger.goods.service.UserService;
import com.skyforger.goods.token.TokenRepository;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private GoodRepository goodRepository;

    @GetMapping("/view")
    public List<User> viewAllUsers(){
        System.out.printf("users");
        return userService.getAllUsers();
    }

    @GetMapping("/cart")
    @CrossOrigin(origins = "*")
    public String cart(@RequestHeader("Authorization") String token){
        JSONObject json = new JSONObject();
        String message;
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        System.out.println(user.getCartItems());
        json.put("items", user.getCartItems());
        message = json.toString();
        return message;
    }

    @PostMapping("/addToCart")
    @CrossOrigin(origins = "*")
    public void addToCart(@RequestHeader("Authorization") String token, @RequestBody CartRequest request){
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        user.addCart((Good) goodRepository.findById(request.getGood_id()));
        userService.saveUser(user);
        return;
    }
    @PostMapping("/delFromCart")
    @CrossOrigin(origins = "*")
    public void delFromCart(@RequestHeader("Authorization") String token, @RequestBody CartRequest request){
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        user.delCart((Good) goodRepository.findById(request.getGood_id()));
        userService.saveUser(user);
        return;
    }


}
