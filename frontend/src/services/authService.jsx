// export const BACKEND_CONFIG = {
//     BASE_URL: "http://localhost:4002",
//     headers: {
//         accept: "application/json",
//     }
// }

// export const register = async ({ nombre, apellido, email, password, rol }) => {
//     const endpoint = `${BACKEND_CONFIG.BASE_URL}/api/v1/auth/register`;

//     const response = await fetch(endpoint, {
//         method: "POST",
//         headers: BACKEND_CONFIG.headers,
//         body: JSON.stringify({
//             firstname: nombre,
//             lastname: apellido,
//             email: email,
//             password: password,
//             role: rol
//         }),
//     });

//     if (!response.ok) {
//         throw new Error("Error fetching", { cause: response.statusText });
//     }

//     const data = await response.json();
//     return data;
// }

// export const login = async ({email, password}) => {
//     await fetch("http://localhost:4002/api/v1/auth/authenticate", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     })
//       .then(async (response) => {
//         if (!response.ok) {
//             localStorage.setItem("token", "");
//         }

//         const data = await response.json();

//         console.log(data);
        
//         localStorage.setItem("token", data.access_token);

//         if (data.role === "ADMIN") {
//           navigate("/admin/dashboard");
//         } else {
//           navigate("/");
//         }
//       })
//       .catch((err) => {
//         setError(err.message);
//       });
// }

