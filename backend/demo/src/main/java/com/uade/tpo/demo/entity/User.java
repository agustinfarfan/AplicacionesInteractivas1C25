package com.uade.tpo.demo.entity;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.uade.tpo.demo.entity.dto.UserDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.uade.tpo.demo.enums.Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String name;

    private String password;

    private String firstName;

    @Column(nullable = false, unique = true)
    private String lastName;

    @OneToMany(mappedBy = "user")
    private List<Order> orders;

    @Enumerated(EnumType.STRING)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Column(name = "razon_social", nullable = false)
    private String razonSocial;

    @Column(name = "cuil", nullable = false, unique = true)
    private String cuil;

    private String calle;
    private Integer altura;
    @Column(name = "codigo_postal")
    private String codigoPostal;
    private String localidad;
    private String provincia;

    public UserDTO getDTO() {
        return new UserDTO(id, email, firstName,lastName, role, razonSocial, shippingAddresses.stream().map(ShippingAddress::getDTO).toList());
    }

     /** Lista de direcciones de envío asociadas **/
    @OneToMany(
        mappedBy = "user",
        cascade = jakarta.persistence.CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ShippingAddress> shippingAddresses = new ArrayList<>();
}
