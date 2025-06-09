package com.uade.tpo.demo.service;

import com.uade.tpo.demo.entity.dto.ShippingAddressRequest;
import com.uade.tpo.demo.entity.dto.ShippingAddressDTO;
import java.util.List;

public interface ShippingAddressService {
    List<ShippingAddressDTO> listByUser(Long userId);
    ShippingAddressDTO create(Long userId, ShippingAddressRequest req);
    ShippingAddressDTO update(Long id, ShippingAddressRequest req);
    void delete(Long id);
}
