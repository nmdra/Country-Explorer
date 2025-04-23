import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-center">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 text-xl text-yellow-500 dark:text-white hover:scale-105 transition"
        title="Toggle Theme"
      >
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <div className="p-6 max-w-xl bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          🚧 Development In Progress
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          This application is currently under active development. Please check
          back later for updates.
        </p>
      </div>
    </div>
  );
}

export default App;
