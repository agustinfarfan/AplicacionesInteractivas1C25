// src/pages/tienda/Direcciones.jsx
import React, { useState, useEffect } from "react";
import { getUserIdFromToken } from "../../utils/auth";
import { useAuth } from '../../context/AuthContext';

const Address = () => {

  const userId = localStorage.getItem("token") ? getUserIdFromToken(localStorage.getItem("token")) : null;

  const [list, setList] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [active, setActive] = useState(null);
  const [form, setForm] = useState({
    alias: "",
    calle: "",
    altura: "",
    codigoPostal: "",
    localidad: "",
    provincia: ""
  });
  const [toDelete, setToDelete] = useState(null);

  // 1) Cargar direcciones al montar
  useEffect(() => {

    console.log("Cargando direcciones para el usuario:", userId);

    if (!userId) return;
    fetch(`http://localhost:4002/shipping-addresses/user/${userId}`)
      .then(r => r.json())
      .then(data => setList(data))
      .catch(console.error);
  }, [userId]);

  // 2) Abrir modal para nueva o editar
  const openNew = () => {
    setActive(null);
    setForm({ alias: "", calle: "", altura: "", codigoPostal: "", localidad: "", provincia: "" });
    setShowModal(true);
  };
  const openEdit = addr => {
    setActive(addr);
    setForm({ 
      alias: addr.alias,
      calle: addr.calle,
      altura: addr.altura,
      codigoPostal: addr.codigoPostal,
      localidad: addr.localidad,
      provincia: addr.provincia
    });
    setShowModal(true);
  };

  // 3) Guardar (POST o PUT)
  const handleSave = async () => {
  const token = localStorage.getItem("token");
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    let resp;
    if (active) {
      // --- MODO “EDITAR”: usamos el id de la dirección ---
      resp = await fetch(
        `http://localhost:4002/shipping-addresses/${active.id}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...authHeader,
          },
          body: JSON.stringify(form),
        }
      );
    } else {
      // --- MODO “CREAR”: aquí sí usamos el userId o /me ---
      resp = await fetch(
        `http://localhost:4002/shipping-addresses/user/${userId}`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeader,
          },
          body: JSON.stringify(form),
        }
      );
    }

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Error guardando: ${text}`);
    }

    // Una vez OK, recargamos la lista exacta igual que en load
    const lista = await fetch(
      `http://localhost:4002/shipping-addresses/user/${userId}`, 
      // o `/me` si lo usas para listar
      { headers: { ...authHeader } }
    );
    const data = await lista.json();
    setList(data);

    // Cerrar modal / reset
    setShowModal(false);
    setActive(null);
  } catch (err) {
    console.error("Error en handleSave:", err);
    alert("Hubo un error al guardar la dirección.");
  }
};

  // 4) Eliminar
 // Función para confirmar/ejecutar la eliminación
const confirmDelete = async () => {


  const token = localStorage.getItem("token");
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  try {
    const resp = await fetch(
      `http://localhost:4002/shipping-addresses/${toDelete.id}`, // usa el ID de la dirección
      {
        method: "DELETE",
        headers: {
          ...authHeader
        },
      }
    );

    console.log("Respuesta de eliminar:", resp);

    if (resp.ok) {
      // Si borró bien, filtramos la dirección eliminada del state
      setList((current) => current.filter((addr) => addr.id !== toDelete.id));
    } else {
      // Si no es 200, leemos texto para mostrar error
      const text = await resp.text();
      throw new Error(text || "Error al eliminar");
    }
  } catch (err) {
    console.error("Error en confirmDelete:", err);
    alert("No se pudo eliminar la dirección: " + err.message);
  } finally {
    setToDelete(null);
  }
};

  // 5) Filtrar / Render
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Mis Direcciones de Envío</h1>
      <button
        onClick={openNew}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Nueva Dirección
      </button>
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              {["Alias","Calle","Altura","CP","Localidad","Provincia","Acción"].map((h) => (
                <th key={h} className="px-4 py-2 text-left text-sm font-medium text-gray-500">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((addr, idx) => (
              <tr key={addr.id} className={idx % 2 ? "bg-gray-50" : ""}>
                <td className="px-4 py-2 text-sm">{addr.alias}</td>
                <td className="px-4 py-2 text-sm">{addr.calle}</td>
                <td className="px-4 py-2 text-sm">{addr.altura}</td>
                <td className="px-4 py-2 text-sm">{addr.codigoPostal}</td>
                <td className="px-4 py-2 text-sm">{addr.localidad}</td>
                <td className="px-4 py-2 text-sm">{addr.provincia}</td>
                <td className="px-4 py-2 text-sm flex gap-2">
                  <button
                    onClick={() => openEdit(addr)}
                    className="px-2 py-1 bg-blue-600 text-white rounded"
                  >Editar</button>
                  <button
                    onClick={() => setToDelete(addr)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >Eliminar</button>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-2 text-center text-gray-500">Sin direcciones.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Crear/Editar */}
      {showModal && (
        <>
          <div
            onClick={() => setShowModal(false)}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">{active ? "Editar Dirección" : "Nueva Dirección"}</h2>
              {[
                { label: "Alias", key: "alias" },
                { label: "Calle", key: "calle" },
                { label: "Altura", key: "altura", type: "number" },
                { label: "Código Postal", key: "codigoPostal" },
                { label: "Localidad", key: "localidad" },
                { label: "Provincia", key: "provincia" },
              ].map(({ label, key, type }) => (
                <div key={key} className="mb-3">
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <input
                    type={type || "text"}
                    value={form[key]}
                    onChange={e => setForm({ ...form, [key]: type === "number" ? +e.target.value : e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-indigo-500"
                  />
                </div>
              ))}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >Cancelar</button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >Guardar</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal Confirmar Eliminar */}
      {toDelete && (
        <>
          <div
            onClick={() => setToDelete(null)}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow w-full max-w-sm">
              <p className="mb-4">¿Eliminar la dirección <strong>{toDelete.alias}</strong>?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setToDelete(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >Cancelar</button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded"
                >Eliminar</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Address;
