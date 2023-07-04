package com.exam.examserver.services;

import java.util.Set;
import com.exam.examserver.model.User;
import com.exam.examserver.model.userRole;


public interface UserService {

    //create user
    public User creatUser(User user,Set<userRole> userRoles);

    public User GetUser(String username);

    public boolean deleteUserByUsername(String username);

    public User updateUser(User user);
}
