
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
