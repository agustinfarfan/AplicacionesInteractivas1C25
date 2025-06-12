import { IdCardIcon } from "lucide-react";

export const BACKEND_CONFIG = {
    BASE_URL: "http://localhost:4002",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
}


export const fetchAllCupones = async () => {

    const endpoint = `${BACKEND_CONFIG.BASE_URL}/coupon`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
    });

    
    if (!response.ok) {
        throw new Error("Error fetching", { cause: response.statusText });
    }

    const data = await response.json();
   
    return data;
}

export const createCupon = async ({ nombre, cantidadUsos, tipoDescuento, descuento }) => {

    const endpoint = `${BACKEND_CONFIG.BASE_URL}/coupon`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            ...BACKEND_CONFIG.headers,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: nombre,
            cantidadUsos: cantidadUsos,
            tipoDescuento: tipoDescuento,
            descuento: descuento
        }),
    });

    if (!response.ok) {
        throw new Error("Error fetching", { cause: response.statusText });
    }

    const data = await response.json();
    return data;
}

export const updateCupon = async ({ id, nombre, cantidadUsos, tipoDescuento, descuento }) => {

    const endpoint = `${BACKEND_CONFIG.BASE_URL}/coupon/${id}`;

    const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
            ...BACKEND_CONFIG.headers,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nombre: nombre,
            cantidadUsos: cantidadUsos,
            tipoDescuento: tipoDescuento,
            descuento: descuento
        }),
    });

    if (!response.ok) {
        throw new Error("Error fetching", { cause: response.statusText });
    }

    const data = await response.json();
    return data;
}

export const deleteCupon = async ({ id }) => {

    const endpoint = `${BACKEND_CONFIG.BASE_URL}/coupon/${id}`;

    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    });


    if (!response.ok) {
        throw new Error("Error fetching", { cause: response.statusText });
    }

    const data = await response.json();

    return data;
}