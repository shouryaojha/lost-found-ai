import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate("/");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 shadow-lg border-b border-gray-800">

      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <Link
          to="/"
          className="text-2xl font-bold text-yellow-400"
        >
          Lost&Found AI
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-yellow-400 transition"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-yellow-400 transition"
          >
            Dashboard
          </Link>

          {token && (
            <Link
              to="/add-item"
              className="hover:text-yellow-400 transition"
            >
              Add Item
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-yellow-400 px-4 py-2 rounded-lg hover:bg-yellow-400 hover:text-black transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-400 transition"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}