package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.UserCreateDTO;
import com.uade.tpo.demo.entity.dto.UserDTO;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserDTO> obtenerTodos() {
        return userRepository.findAll().stream().map(User::getDTO).toList();
    }

    @Override
    public UserDTO obtenerPorId(Long id) {

        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No se encontró user con id: " + id));

        return user.getDTO();
    }

    @Override
    @Transactional
    public UserDTO actualizarUser(Long id, UserCreateDTO request) {

        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("No se encontró user con id: " + id));

        user.setEmail(request.getEmail());
        user.setFirstName(request.getFirst_name());
        user.setLastName(request.getLast_name());
        user.setRole(request.getRole());

        User savedUser = userRepository.save(user);

        return savedUser.getDTO();
    }
}
