package com.skyforger.goods.service;

import com.skyforger.goods.model.User;
import com.skyforger.goods.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Objects;

/**
 * @author Ivan 18.03.2023
 */
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String mail) throws UsernameNotFoundException {
        User u = userRepository.findByMail(mail).get();
        if (Objects.isNull(u)) {
            throw new UsernameNotFoundException(String.format("User %s is not found", mail));
        }
        return new org.springframework.security.core.userdetails.User(u.getMail(), u.getPassword(), true, true, true, true, new HashSet<>());

    }
}
