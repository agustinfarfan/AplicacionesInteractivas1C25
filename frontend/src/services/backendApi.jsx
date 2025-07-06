
export const BACKEND_CONFIG = {
  BASE_URL: "http://localhost:4002",
  headers: {
    accept: "application/json",
  }
}

export const fetchProducts = async () => {

  const endpoint = `${BACKEND_CONFIG.BASE_URL}/productos`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      accept: "application/json",
    }
  });

  if (!response.ok) {
    throw new Error("Error fetching", { cause: response.statusText });
  }

  const data = await response.json();
  return data;
}

export const fetchProductById = async ({ id }) => {

  const endpoint = `${BACKEND_CONFIG.BASE_URL}/productos/${id}`;

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

export const fetchProductsByCategory = async ({ id }) => {

  const endpoint = `${BACKEND_CONFIG.BASE_URL}/productos/categoria/${id}`;

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
export const getMappedCategories = async () => {
  const raw = await fetchCategories();
  const data = raw.content || raw;

  return data.map((c) => ({
    id: c.id,
    nombre: c.name,
    descripcion: c.description,
  }));
};

export const fetchCategories = async () => {

  const endpoint = `${BACKEND_CONFIG.BASE_URL}/categories`;

  const response = await fetch(endpoint, {
    method: "GET",
    headers: {
      accept: "application/json",
    }
  });

  if (!response.ok) {
    throw new Error("Error fetching", { cause: response.statusText });
  }

  const data = await response.json();
  return data;
}

export const loginAdmin = async (email, password) => {
  const endpoint = `${BACKEND_CONFIG.BASE_URL}/auth/login`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Credenciales incorrectas');
  }

  const data = await response.json();
  return data; // debería contener el token
};


export const createProduct = async (product, token) => {
  const endpoint = `${BACKEND_CONFIG.BASE_URL}/productos`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      ...BACKEND_CONFIG.headers,
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`, // ✅ Agregado
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error al crear el producto");
  }

  const data = await response.json();
  return data;
};

export const deleteProduct = async (id, token) => {

   console.log("TOKEN EN updateProduct:", token);
   
  const endpoint = `${BACKEND_CONFIG.BASE_URL}/productos/${id}`;

  const response = await fetch(endpoint, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "Authorization": `Bearer ${token}`, // ✅ Usamos token recibido
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el producto");
  }
};

export const updateProduct = async (product, token) => {
  const endpoint = `${BACKEND_CONFIG.BASE_URL}/productos/${product.id}`;

  const response = await fetch(endpoint, {
    method: "PUT",
    headers: {
      ...BACKEND_CONFIG.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el producto");
  }

  return await response.json();
};
