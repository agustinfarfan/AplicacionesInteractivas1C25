package com.uade.tpo.demo.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST, reason = "La cantidad dada es incorrecta. Ingresar cantidad mayor a 0.")
public class CartProductQuantityException extends RuntimeException {
    public CartProductQuantityException(String message) {super(message);}
}

