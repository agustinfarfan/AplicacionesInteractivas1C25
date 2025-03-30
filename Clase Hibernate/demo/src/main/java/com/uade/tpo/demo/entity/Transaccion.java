package com.uade.tpo.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class Transaccion {
    public Transaccion() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "metodo_de_pago_id")
    private MetodoDePago metodoPago;

    @Column()
    private String nombreTitular;

    @Column(length = 4)
    private String ultimos4Digitos;

    @Column
    private String tipoTarjeta;

    @Column
    private String fechaTransaccion;
    
}
