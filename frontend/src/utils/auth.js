// src/utils/auth.js

import { jwtDecode } from "jwt-decode";

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

  try {
    const token = localStorage.getItem("token");
    jwtDecode(token);
    return true;
  } catch (error) {
    return false;
  }

}

/**
 * Decodifica el JWT y devuelve el campo "sub" (o el nombre) del payload.
 */
export function getUsernameFromToken(token) {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    // Ajusta según cómo pongas el nombre en tu token: aquí uso "sub"
    return decoded.sub || decoded.username || "Usuario";
  } catch {
    return "Usuario";
  }
}

export function getUserIdFromToken() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    // Suponemos que el backend incluye "sub" = userId o {"userId": ...}
    return decoded.user_id || decoded.sub || null;
  } catch {
    return null;
  }
}

