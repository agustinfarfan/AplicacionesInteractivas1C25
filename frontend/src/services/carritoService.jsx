
export const BACKEND_CONFIG = {
    BASE_URL: "http://localhost:4002",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
}

export const fetchCart = async ({ id }) => {
    console.log(id);
    const endpoint = `${BACKEND_CONFIG.BASE_URL}/user/${id}/cart`;

    const response = await fetch(endpoint, {
        method: "GET",
        headers: BACKEND_CONFIG.headers,
    });

    
    if (!response.ok) {
        throw new Error("Error fetching", { cause: response.statusText });
    }

    const data = await response.json();

    console.log(data);
    
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

export const addProductoToCart = async ({ userId, productoId, cantidad }) => {
  const endpoint = `http://localhost:4002/user/${userId}/cart/addProduct`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({
      productId: productoId,
      cantidad: cantidad,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data;
};

export const deleteProductoFromCart = async ({ userId, productoId, cantidad }) => {
    const endpoint = `http://localhost:4002/user/${userId}/cart/removeProduct`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      productId: productoId,
      cantidad: cantidad,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data;
}

export const finalizeCart = async ({ userId }) => {
  const endpoint = `http://localhost:4002/user/${userId}/cart/finalize`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data;
};


