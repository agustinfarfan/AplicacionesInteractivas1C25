package com.uade.tpo.demo.entity;

import com.uade.tpo.demo.entity.dto.CreateCuponRequest;
import com.uade.tpo.demo.entity.dto.CuponDTO;
import com.uade.tpo.demo.enums.TipoDescuento;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class Cupon {

    public Cupon() { }

    public Cupon(CreateCuponRequest request) {
        this.nombre = request.getNombre();
        this.cantidadUsos = request.getCantidadUsos();
        this.descuento = request.getDescuento();
        this.tipoDescuento = request.getTipoDescuento();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;

    @Column(name = "cantidad_usos")
    private Long cantidadUsos;

    @Column(name = "cantidad_actual")
    private Long cantidadActual = 0L;

    private Double descuento;

    @Column(name = "tipo_descuento")
    private TipoDescuento tipoDescuento;

    public CuponDTO getDTO() {
        return CuponDTO.builder()
            .id(id)
            .nombre(nombre)
            .cantidadUsos(cantidadUsos)
            .cantidadActual(cantidadActual)
            .tipoDescuento(tipoDescuento)
            .descuento(descuento)
            .build();
    }

}
