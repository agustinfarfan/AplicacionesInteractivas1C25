import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCupones,
  addCupon,
  editCupon,
  removeCupon,
} from "../../redux/cupones/cuponesReducer";

const CuponesAdmin = () => {
  const dispatch = useDispatch();
  const cupones = useSelector((state) => state.cupones.items);
  const loading = useSelector((state) => state.cupones.loading);
  const token = useSelector((state) => state.user.token);

  const [searchTerm, setSearchTerm] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [activeCupon, setActiveCupon] = useState(null);
  const [formNombre, setFormNombre] = useState("");
  const [formCantidadUsos, setFormCantidadUsos] = useState("");
  const [formTipoDescuento, setFormTipoDescuento] = useState("");
  const [formDescuento, setFormDescuento] = useState("");
  const [activeDeleteCupon, setActiveDeleteCupon] = useState(null);

  useEffect(() => {
    dispatch(loadCupones());
  }, [dispatch]);

  const openAddModal = () => {
    setActiveCupon(null);
    setFormNombre("");
    setFormCantidadUsos("");
    setFormTipoDescuento("");
    setFormDescuento("");
    setShowModal(true);
  };

  const openEditModal = (cupon) => {
    setActiveCupon(cupon);
    setFormNombre(cupon.nombre);
    setFormCantidadUsos(cupon.cantidadUsos);
    setFormTipoDescuento(cupon.tipoDescuento);
    setFormDescuento(cupon.descuento);
    setShowModal(true);
  };

  const handleSave = async () => {
    const payload = {
      nombre: formNombre,
      cantidadUsos: Number(formCantidadUsos),
      tipoDescuento: formTipoDescuento,
      descuento: Number(formDescuento),
    };

    try {
      if (activeCupon) {
        await dispatch(editCupon({ ...payload, id: activeCupon.id })).unwrap();
      } else {
        await dispatch(addCupon(payload)).unwrap();
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error al guardar cupón:", error);
      alert("Error al guardar el cupón.");
    }
  };

  const confirmDelete = async () => {
    if (!activeDeleteCupon) return;
    try {
      await dispatch(removeCupon(activeDeleteCupon.id)).unwrap();
    } catch (error) {
      console.error("Error al eliminar cupón:", error);
      alert("Error al eliminar el cupón.");
    } finally {
      setActiveDeleteCupon(null);
    }
  };

  const filteredCupones = cupones.filter((c) =>
    c.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Administración de Cupones</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar cupones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo Descuento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descuento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usos Máximos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usos Actuales</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acción</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCupones.length > 0 ? (
              filteredCupones.map((cupon, idx) => (
                <tr key={cupon.id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                  <td className="px-6 py-4 text-sm text-gray-700">{cupon.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{cupon.nombre}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cupon.tipoDescuento}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cupon.descuento}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cupon.cantidadUsos}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{cupon.cantidadActual}</td>
                  <td className="px-6 py-4 text-sm font-medium flex gap-2">
                    <button
                      onClick={() => openEditModal(cupon)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => setActiveDeleteCupon(cupon)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-sm text-gray-500 text-center">
                  No se encontraron cupones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <button
          onClick={openAddModal}
          className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          + Agregar cupón
        </button>
      </div>

      {/* Modal Crear/Editar */}
      {showModal && (
        <>
          <div
            onClick={() => {
              setShowModal(false);
              setActiveCupon(null);
            }}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">
                {activeCupon ? "Editar cupón" : "Crear nuevo cupón"}
              </h2>

              <input
                type="text"
                placeholder="Nombre"
                value={formNombre}
                onChange={(e) => setFormNombre(e.target.value)}
                className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md"
              />

              <select
                value={formTipoDescuento}
                onChange={(e) => setFormTipoDescuento(e.target.value)}
                className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Tipo de descuento</option>
                <option value="PORCENTUAL">Porcentual</option>
                <option value="FIJO">Fijo</option>
              </select>

              <input
                type="number"
                placeholder="Descuento"
                value={formDescuento}
                onChange={(e) => setFormDescuento(e.target.value)}
                className="mb-2 w-full px-3 py-2 border border-gray-300 rounded-md"
              />

              <input
                type="number"
                placeholder="Cantidad máxima de usos"
                value={formCantidadUsos}
                onChange={(e) => setFormCantidadUsos(e.target.value)}
                className="mb-4 w-full px-3 py-2 border border-gray-300 rounded-md"
              />

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setActiveCupon(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Modal Confirmar Eliminar */}
      {activeDeleteCupon && (
        <>
          <div onClick={() => setActiveDeleteCupon(null)} className="fixed inset-0 bg-black/30 z-40" />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
              <p className="text-base text-gray-800 mb-4">
                ¿Seguro que desea eliminar el cupón{" "}
                <span className="font-semibold">{activeDeleteCupon.nombre}</span>?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setActiveDeleteCupon(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CuponesAdmin;
