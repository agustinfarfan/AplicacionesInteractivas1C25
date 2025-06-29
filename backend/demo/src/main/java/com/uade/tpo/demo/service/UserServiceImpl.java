package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.ShippingAddressDTO;
import com.uade.tpo.demo.entity.dto.UserCreateDTO;
import com.uade.tpo.demo.entity.dto.UserDTO;
import com.uade.tpo.demo.exceptions.ResourceNotFoundException;
import com.uade.tpo.demo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    @Override
    public Optional<UserDTO> findByEmail(String email) {
        return userRepository.findByEmail(email)
            .map(user -> {
                // mapeo de direcciones
                List<ShippingAddressDTO> dtos = user.getShippingAddresses().stream()
                    .map(addr -> new ShippingAddressDTO(
                        addr.getId(),
                        addr.getAlias(),
                        addr.getCalle(),
                        addr.getAltura(),
                        addr.getCodigoPostal(),
                        addr.getLocalidad(),
                        addr.getProvincia()
                    ))
                    .collect(Collectors.toList());

                // creamos el UserDTO con la lista
                return new UserDTO(
                    user.getId(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    user.getRazonSocial(),
                    dtos
                );
            });
    }

    
}
