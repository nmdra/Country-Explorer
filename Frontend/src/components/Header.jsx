import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  const { userEmail, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md relative z-50">
      <Link to="/">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white hover:underline pr-2.5">
          Country Explorer
        </h1>
      </Link>

      <DarkModeToggle />

      <div className="flex items-center gap-4 ml-auto">
        {userEmail ? (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-2xl text-gray-700 dark:text-gray-200"
            >
              <FaUserCircle />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-900 shadow-lg rounded-md py-2 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
                  {userEmail}
                </div>
                <Link
                  to="/favorites"
                  className="block px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMenuOpen(false)}
                >
                  ⭐ Favorites
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
