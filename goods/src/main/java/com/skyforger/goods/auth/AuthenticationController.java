package com.skyforger.goods.auth;

import com.skyforger.goods.model.User;
import com.skyforger.goods.token.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;

    @Autowired
    TokenRepository tokenRepository;


    @PostMapping("/register")
    @CrossOrigin(origins = "*")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ){
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    @CrossOrigin(origins = "*")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody AuthenticationRequest request
    ){
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);
    }

    @GetMapping("/profile")
    @CrossOrigin(origins = "*")
    public String profile(@RequestHeader("Authorization") String token){
        JSONObject object = new JSONObject();
        String message;
        token = token.substring(7, token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        object.put("name", user.getName());
        object.put("role", user.getRole().name());
        object.put("mail", user.getMail());
        message = object.toString();
        return message;
    }

    @GetMapping("/cart")
    @CrossOrigin
    public String cart(@RequestHeader("Authorization") String token){
        JSONObject json = new JSONObject();
        String message;
        token = token.substring(7,token.length());
        User user = tokenRepository.findByToken(token).get().getUser();
        System.out.println(user.getCart());
        json.put("cart", user.getCart());
        message = json.toString();
        return message;
    }
}
