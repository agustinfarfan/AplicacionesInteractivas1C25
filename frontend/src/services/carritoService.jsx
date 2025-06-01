
export const BACKEND_CONFIG = {
    BASE_URL: "http://localhost:4002",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_JWT_TOKEN || ""}`,
    }
}

export const fetchCart = async ({ id }) => {
    const endpoint = `${BACKEND_CONFIG.BASE_URL}/cart/${id}`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: BACKEND_CONFIG.headers,
    });

    if (!response.ok) {
        throw new Error("Error fetching", { cause: response.statusText });
    }

    const data = await response.json();
    return data;
}

export const createCart = async ({ userId }) => {
    const endpoint = `${BACKEND_CONFIG.BASE_URL}/cart/create`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: BACKEND_CONFIG.headers,
        body: {
            userId: userId
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching", { cause: response.statusText });
    }

    const data = await response.json();
    return data;
}

export const addProductoToCart = async ({ cartId, productId, cantidad }) => {
    const endpoint = `${BACKEND_CONFIG.BASE_URL}/cart/${cartId}/addProduct`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: BACKEND_CONFIG.headers,
        body: {
            "productId": productId,
            "cantidad": cantidad
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching", { cause: response.statusText });
    }

    const data = await response.json();
    return data;
}

export const deleteProductoFromCart = async ({ cartId, productId }) => {
    const endpoint = `${BACKEND_CONFIG.BASE_URL}/cart/${cartId}/removeProduct`;

    const response = await fetch(endpoint, {
        method: "DELETE",
        headers: BACKEND_CONFIG.headers,
        body: {
            "productId": productId
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching", { cause: response.statusText });
    }

    const data = await response.json();
    return data;
}


