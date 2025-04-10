package com.uade.tpo.demo.repository;

import com.uade.tpo.demo.entity.OrderDetails;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
    List<OrderDetails> findByOrderId(Long id);
}
