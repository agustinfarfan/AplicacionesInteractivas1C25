package com.uade.tpo.demo.controllers;

import com.uade.tpo.demo.entity.User;
import com.uade.tpo.demo.entity.dto.OrderDTO;
import com.uade.tpo.demo.entity.dto.UserCreateDTO;
import com.uade.tpo.demo.entity.dto.UserDTO;
import com.uade.tpo.demo.service.OrderService;
import com.uade.tpo.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private OrderService orderService;

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

    @GetMapping("/me")
     public ResponseEntity<UserDTO> getCurrentUser(
         @AuthenticationPrincipal UserDetails userDetails
     ) {
         // asumo que tu UserService tiene un método buscarPorEmail
         UserDTO dto = userService
             .findByEmail(userDetails.getUsername())
             .orElseThrow(() ->
                 new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado")
             );
         return ResponseEntity.ok(dto);
     }
    @GetMapping("/{userId}/orders")
    public ResponseEntity<List<OrderDTO>> obtenerPedidos(@PathVariable Long userId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(orderService.getOrdersByUserId(userId, email));
    }

}
