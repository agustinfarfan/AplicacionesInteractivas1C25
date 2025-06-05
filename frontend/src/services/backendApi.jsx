
export const BACKEND_CONFIG = {
    BASE_URL: "http://localhost:4002",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_REACT_APP_JWT_TOKEN || ""}`,
    }
}

export const fetchProducts = async () => {

    const endpoint = `${BACKEND_CONFIG.BASE_URL}/categories`;

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

