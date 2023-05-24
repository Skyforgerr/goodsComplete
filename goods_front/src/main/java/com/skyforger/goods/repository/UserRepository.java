package com.skyforger.goods.repository;

import com.skyforger.goods.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author Ivan 18.03.2023
 */
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByMail(String mail);
    List<User> findAll();
}
