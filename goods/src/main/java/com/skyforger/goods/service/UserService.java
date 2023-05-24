package com.skyforger.goods.service;

import com.skyforger.goods.model.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

/**
 * @author Ivan 18.03.2023
 */
public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
    public UserDetails loadUserByUsername(String mail);
}
