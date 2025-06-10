
export const BACKEND_CONFIG = {
    BASE_URL: "http://localhost:4002",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
}


export const fetchAllPedidos = async () => {

    const endpoint = `${BACKEND_CONFIG.BASE_URL}/orders`;

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

export const fetchPedidoById = async ({ id }) => {

    const endpoint = `${BACKEND_CONFIG.BASE_URL}/orders/${id}`;

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

export const fetchPedidosByUserId = async ({ id }) => {

    const endpoint = `${BACKEND_CONFIG.BASE_URL}/user/${id}/orders`;

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