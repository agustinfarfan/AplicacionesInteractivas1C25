import React, { useState, useEffect } from "react";
import { createCupon, deleteCupon, fetchAllCupones, updateCupon } from "../../services/cuponesService";

const CuponesAdmin = () => {
    // —————————— Estados ——————————
    const [cupones, setCupones] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // (modales, edición, eliminación, etc. siguen igual)
    const [showModal, setShowModal] = useState(false);
    const [activeCupon, setactiveCupon] = useState(null);
    const [formNombre, setFormNombre] = useState("");
    const [formCantidadUsos, setFormCantidadUsos] = useState("");
    const [formTipoDescuento, setFormTipoDescuento] = useState("");
    const [formDescuento, setFormDescuento] = useState("");

    const [activeDeleteCupon, setActiveDeleteCupon] = useState(null);

    // —————————— Cargar Cupones al montar ——————————
    useEffect(() => {
        const loadCupones = async () => {
            try {
                const data = await fetchAllCupones();
                console.log(data);
                
                setCupones(data);
            } catch (error) {
                console.error("No se pudieron cargar cupones:", error);
            }
        };

        loadCupones();
    }, []);

    // —————————— Manejo de creación/edición (igual que antes) ——————————
    const openAddModal = () => {
        setactiveCupon(null);
        setFormNombre("");
        setFormCantidadUsos("");
        setFormTipoDescuento("");
        setFormDescuento("");
        setShowModal(true);
    };

    const openEditModal = (cupon) => {
        setactiveCupon(cupon);
        setFormNombre(cupon.nombre);
        setFormCantidadUsos(cupon.cantidadUsos);
        setFormTipoDescuento(cupon.tipoDescuento);
        setFormDescuento(cupon.descuento);
        setShowModal(true);
    };

    const handleSave = async () => {

        try {
            let resp;
            if (activeCupon) {
                await updateCupon({
                    id: activeCupon.id,
                    nombre: formNombre,
                    cantidadUsos: formCantidadUsos,
                    tipoDescuento: formTipoDescuento,
                    descuento: formDescuento
                })
            } else {                
                await createCupon({
                    nombre: formNombre,
                    cantidadUsos: formCantidadUsos,
                    tipoDescuento: formTipoDescuento,
                    descuento: formDescuento
                })
            }

            // Tras guardar, recargamos la lista completa desde el backend:
            await loadCuponesBackend();

            setFormNombre("");
            setFormCantidadUsos("");
            setFormTipoDescuento("");
            setFormDescuento("");
            setactiveCupon(null);
            setShowModal(false);
        } catch (error) {
            console.error("Error en guardar cupón:", error);
            alert("Hubo un error al guardar. Revisa la consola.");
        }
    };

    // Función auxiliar para recargar el arreglo de cupones tras crear/editar/eliminar
    const loadCuponesBackend = async () => {
        try {
            const data = await fetchAllCupones();
            setCupones(data);
        } catch (error) {
            console.error("No se pudieron recargar cupones:", error);
        }
    };

    const confirmDelete = async () => {

        const token = localStorage.getItem("token");
        const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

        try {
            await deleteCupon({id: activeDeleteCupon.id});
            await loadCategoriasBackend();
        } catch (error) {
            console.error("Error en eliminar cupón:", error);
            alert("Hubo un error al eliminar. Revisa la consola.");
        } finally {
            setActiveDeleteCupon(null);
        }
    };

    // —————————— Filtrado local (ya no hay excepción porque `cupones` siempre es array) ——————————
    const filteredCupones = cupones.filter((cat) =>
        cat.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Administración de Cupones</h1>

            {/* Barra de búsqueda */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Buscar cupones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Tabla de cupones */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* Encabezado */}
                    <thead className="bg-gray-100">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Nombre
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Tipo Descuento
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Descuento
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Cantidad Maxima de usos
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Cantidad Actual
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Acción
                            </th>
                        </tr>
                    </thead>

                    {/* Cuerpo de la tabla */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredCupones.length > 0 ? (
                            filteredCupones.map((cupon, idx) => (
                                <tr key={cupon.id} className={idx % 2 === 0 ? "" : "bg-gray-50"}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {cupon.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {cupon.nombre}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {cupon.tipoDescuento}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {cupon.descuento}
                                    </td>           
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {cupon.cantidadUsos}
                                    </td>    
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {cupon.cantidadActual}
                                    </td>      
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2">
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
                                <td
                                    colSpan={3}
                                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
                                >
                                    No se encontraron cupones.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Botón “Agregar cupones */}
            <div className="mt-6">
                <button
                    onClick={openAddModal}
                    className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                    + Agregar cupón
                </button>
            </div>

            {/* Modal “Crear / Editar” (igual que antes) */}
            {showModal && (
                <>
                    <div
                        onClick={() => {
                            setFormNombre("");
                            setFormCantidadUsos("");
                            setFormTipoDescuento("");
                            setFormDescuento("");
                            setactiveCupon(null);
                            setShowModal(false);
                        }}
                        className="fixed inset-0 bg-black/30 z-40"
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">
                                {activeCupon ? "Editar cupón" : "Crear nuevo cupón"}
                            </h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    value={formNombre}
                                    onChange={(e) => setFormNombre(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Ingrese el nombre"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tipo de descuento
                                </label>
                                <select
                                    value={formTipoDescuento}
                                    onChange={(e) => setFormTipoDescuento(e.target.value)}
                                    className="w-full px-3 py-2 border  border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                >
                                    <option className="" value="">Selecciona el tipo de descuento</option>
                                    <option value="PORCENTUAL">Porcentual</option>
                                    <option value="FIJO">Fijo</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Descuento (Total a descontar)
                                </label>
                                <input
                                    type="text"
                                    value={formDescuento}
                                    onChange={(e) => setFormDescuento(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Ingrese el valor"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Cantidad Maxima de usos
                                </label>
                                <input
                                    type="text"
                                    value={formCantidadUsos}
                                    onChange={(e) => setFormCantidadUsos(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                    placeholder="Ingrese la cantidad maxima"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => {
                                        setFormNombre("");
                                        setFormCantidadUsos("");
                                        setFormTipoDescuento("");
                                        setFormDescuento("");
                                        setactiveCupon(null);
                                        setShowModal(false);
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

            {/* Modal “Confirmar Eliminar” (igual que antes) */}
            {activeDeleteCupon && (
                <>
                    <div
                        onClick={() => setActiveDeleteCupon(null)}
                        className="fixed inset-0 bg-black/30 z-40"
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                            <p className="text-base text-gray-800 mb-4">
                                ¿Seguro que desea eliminar el cupón?{" "}
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
