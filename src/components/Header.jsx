import DarkModeToggle from "./DarkModeToggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Country Explorer
      </h1>
      <DarkModeToggle />
    </header>
  );
};

export default Header;
