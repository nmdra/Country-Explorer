import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <Link to="/">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white hover:underline">
          Country Explorer
        </h1>
      </Link>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
