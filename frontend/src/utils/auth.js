// src/utils/auth.js

/**
 * Toma un JWT (string) y devuelve un arreglo con las autoridades/roles.
 * Asume que el payload (segunda parte del JWT) tiene una propiedad
 * `authorities` o `roles` que es un array de strings, e.g. ["ROLE_USER", "ROLE_VENDOR"].
 */
export function getRolesFromToken(token) {
  try {
    // El JWT es: header.payload.signature
    const payload = token.split(".")[1];
    const decodedJson = atob(payload);
    const decoded = JSON.parse(decodedJson);

    // Puede variar cómo tu backend llame esa propiedad: { authorities: [... ] } o { roles: [...] }
    return decoded.authorities || decoded.roles || [];
  } catch (err) {
    console.error("Error al decodificar token:", err);
    return [];
  }
}

/**
 * Devuelve true si en localStorage existe un token válido y que contenga "ROLE_VENDOR".
 */
export function isVendor() {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const roles = getRolesFromToken(token);
  return roles.includes("ROLE_VENDOR") || roles.includes("VENDOR");
}

/**
 * Devuelve true si hay un token almacenado (no necesariamente vendor).
 */
export function isLoggedIn() {
  return Boolean(localStorage.getItem("token"));
}
