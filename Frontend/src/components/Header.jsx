import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes, FaHome, FaStar } from "react-icons/fa"; // Import React Icons
import { MdCompareArrows } from "react-icons/md"; // For "Compare Plans" (optional, you can use any icon you like)
import { useAuth } from "../context/AuthContext";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  const { userEmail, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false); // State to manage mobile nav
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
    setNavOpen(false); // Close mobile nav when logging out
    navigate("/");
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md relative z-50">
      <Link
        to="/"
        className="text-xl font-bold text-gray-800 dark:text-white hover:underline pr-2.5"
      >
        Country Explorer
      </Link>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />

      {/* Mobile Hamburger Icon */}
      <div className="lg:hidden flex items-center gap-4">
        <button
          onClick={() => setNavOpen(!navOpen)}
          className="text-2xl text-gray-700 dark:text-gray-200"
        >
          {navOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`lg:flex items-center gap-4 ml-auto ${navOpen ? "block" : "hidden"} lg:block`}
      >
        <Link
          to="/compare"
          className="flex items-center gap-2 px-3 py-1 text-sm rounded bg-purple-600 text-white hover:bg-purple-700"
        >
          <MdCompareArrows className="text-xl" /> {/* Compare Countries Icon */}
          Compare Countries
        </Link>

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
                  <FaStar className="inline mr-2" /> Favorites
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FaUserCircle className="inline mr-2" /> Logout
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
