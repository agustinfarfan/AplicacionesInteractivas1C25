package com.uade.tpo.demo.controllers;

import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.UserCreateDTO;
import com.uade.tpo.demo.entity.dto.UserDTO;
import com.uade.tpo.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>>  obtenerTodos() {
        return ResponseEntity.ok(userService.obtenerTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(userService.obtenerPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> actualizarUser(@PathVariable Long id, UserCreateDTO request) {
        return ResponseEntity.ok(userService.actualizarUser(id, request));
    }

}
