import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cuil, setCuil] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setLastname(firstname);

    console.log(firstname, lastname, email, password, cuil, razonSocial);
    

    await fetch("http://localhost:4002/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
        role: "USER",
        cuil: cuil,
        razonSocial: razonSocial
      }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Error al registrar");
        navigate("/auth/login");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">Crear cuenta</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        <form onSubmit={handleRegister} className="flex flex-col gap-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Nombre</label>
              <input
                type="text"
                placeholder="Nombre"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Correo</label>
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">CUIL</label>
              <input
                type="text"
                placeholder="CUIL"
                value={cuil}
                onChange={(e) => setCuil(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 font-semibold mb-1">Razón Social</label>
              <input
                type="text"
                placeholder="Razón Social"
                value={razonSocial}
                onChange={(e) => setRazonSocial(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Registrarse
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/auth/login" className="text-blue-600 hover:underline font-medium">
            ¿Ya tenés cuenta? Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
