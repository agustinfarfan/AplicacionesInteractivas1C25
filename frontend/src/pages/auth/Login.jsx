import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/user/authReducer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    dispatch(userLogin({ email, password }))
      .unwrap()
      .then(() => {
        navigate("/");
        window.location.reload();
      })
      .catch(() => {
        setError("Credenciales inválidas");
      });
    
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 ">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-700">Iniciar sesión</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
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
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="mt-8 text-center">
          <Link to="/auth/register" className="text-blue-600 hover:underline font-medium">
            ¿No tenés cuenta? Crear cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;