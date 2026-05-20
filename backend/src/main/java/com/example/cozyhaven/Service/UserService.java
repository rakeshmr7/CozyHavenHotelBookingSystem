package com.example.cozyhaven.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.cozyhaven.DTO.UserDTO;
import com.example.cozyhaven.Entity.User;
import com.example.cozyhaven.Enum.Role;
import com.example.cozyhaven.Mapper.UserMapper;
import com.example.cozyhaven.Repository.UserRepo;

@Service
public class UserService {

    @Autowired
    UserRepo userRepo;

    public UserDTO registerUser(UserDTO user) {
        User u = userRepo.save(UserMapper.toEntity(user));
        return UserMapper.toDTO(u);
    }

    public List<UserDTO> showAllCustomers() {
        List<User> customerList = userRepo.findAllByRole(Role.CUSTOMER);
        return customerList.stream().map(UserMapper::toDTO).toList();
    }

    public List<UserDTO> showAllOwners() {
        List<User> ownerList = userRepo.findAllByRole(Role.OWNER);
        return ownerList.stream().map(UserMapper::toDTO).toList();
    }

    public UserDTO searchCustomer(int id) {
        User customer = userRepo.findByUserIdAndRole(id, Role.CUSTOMER);
        if (customer == null) {
            return null;
        }
        return UserMapper.toDTO(customer);
    }

    public UserDTO searchOwner(int id) {
        User owner = userRepo.findByUserIdAndRole(id, Role.OWNER);
        if (owner == null) {
            return null;
        }
        return UserMapper.toDTO(owner);
    }

    public boolean deleteCustomer(int id) {
        User customer = userRepo.findByUserIdAndRole(id, Role.CUSTOMER);

        if (customer == null) {
            return false;
        }

        userRepo.delete(customer);
        return true;
    }

    public boolean deleteOwner(int id) {
        User owner = userRepo.findByUserIdAndRole(id, Role.OWNER);
        if (owner == null) {
            return false;
        }

        userRepo.delete(owner);
        return true;
    }

    public UserDTO findUserByEmail(String email) {
        return UserMapper.toDTO(userRepo.findByEmail(email));

    }

    public UserDTO updateCustomer(int id, UserDTO user) {
        User existingCustomer = userRepo.findByUserIdAndRole(id, Role.CUSTOMER);
        if (existingCustomer == null) {
            return null;
        }

        existingCustomer.setFirstName(user.getFirstName());
        existingCustomer.setLastName(user.getLastName());
        //existingCustomer.setAge(user.getAge());
        // existingCustomer.setGender(user.getGender());
        existingCustomer.setAddress(user.getAddress());
        existingCustomer.setContact(user.getContact());
        existingCustomer.setEmail(user.getEmail());

        User updatedCustomer = userRepo.save(existingCustomer);
        return UserMapper.toDTO(updatedCustomer);
    }

    public UserDTO updateOwner(int id, UserDTO user) {
        User existingOwner = userRepo.findByUserIdAndRole(id, Role.OWNER);
        if (existingOwner == null) {
            return null;
        }
        existingOwner.setFirstName(user.getFirstName());
        existingOwner.setLastName(user.getLastName());
        existingOwner.setAge(user.getAge());
        existingOwner.setGender(user.getGender());
        existingOwner.setAddress(user.getAddress());
        existingOwner.setContact(user.getContact());
        existingOwner.setEmail(user.getEmail());
        existingOwner.setPassword(user.getPassword());
        User updatedOwner = userRepo.save(existingOwner);
        return UserMapper.toDTO(updatedOwner);
    }

}
