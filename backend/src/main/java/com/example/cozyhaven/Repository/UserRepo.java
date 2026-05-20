package com.example.cozyhaven.Repository;

import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Enum.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepo extends JpaRepository<User, Integer> {
        List<User> findAllByRole(Role role);
        User findByUserIdAndRole(int id, Role role);

         User findByEmail(String email);
}
