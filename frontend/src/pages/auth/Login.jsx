import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:4002/api/v1/auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("Credenciales inválidas");

        const data = await response.json();

        console.log(data);
        
        localStorage.setItem("token", data.access_token);

        if (data.role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Iniciar sesión
        </button>
        <p className="text-sm text-center mt-2">
          ¿No tenés cuenta?{" "}
          <button
            onClick={() => navigate("/auth/register")}
            className="text-blue-500 underline"
          >
            Crear cuenta
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
