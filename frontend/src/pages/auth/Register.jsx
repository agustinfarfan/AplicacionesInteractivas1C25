import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, email, password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al registrar");
        return res.json();
      })
      .then(() => {
        navigate("/auth/login"); // volver al login
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow bg-white">
      <h2 className="text-2xl font-bold mb-4">Crear cuenta</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Registrarse
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => navigate("/auth/login")}
          className="text-blue-600 hover:underline"
        >
          ¿Ya tenés cuenta? Iniciar sesión
        </button>
      </div>
    </div>
  );
};

export default Register;
