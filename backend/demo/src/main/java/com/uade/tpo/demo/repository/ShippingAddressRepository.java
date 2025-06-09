package com.uade.tpo.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.uade.tpo.demo.entity.ShippingAddress;
import java.util.List;
import org.springframework.stereotype.Repository;


@Repository
public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, Long> {
    List<ShippingAddress> findByUserId(Long userId);
}
