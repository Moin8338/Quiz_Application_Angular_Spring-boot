package com.exam.examserver.services.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.examserver.model.User;
import com.exam.examserver.model.userRole;
import com.exam.examserver.repo.RoleRepository;
import com.exam.examserver.repo.UserRepository;
import com.exam.examserver.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User creatUser(User user, Set<userRole> userRoles) {
        User local = null;
        try {
            local = this.userRepository.findByUsername(user.getUsername());

            if (local != null) {
                local=null;
                throw new Exception("user already there");
            } else {
                // create user
                for (userRole ur : userRoles) {
                    roleRepository.save(ur.getRole());
                }
                user.getUserRoles().addAll(userRoles);
                local = this.userRepository.save(user);
            }
        } catch (Exception e) {
            System.out.println("user already there");
        }
        return local;
    }

    @Override
    public User GetUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public boolean deleteUserByUsername(String username) {
        if(this.userRepository.findByUsername(username)!=null){
            this.userRepository.deleteByUsername(username);
            return true;
        }
        return false;
    }

    @Override
    public User updateUser(User user) {
        return this.userRepository.saveAndFlush(user);
    }

}
