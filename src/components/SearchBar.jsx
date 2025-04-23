import { useState, useEffect } from "react";

const SearchBar = ({ searchTerm, setSearchTerm, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    setShowSuggestions(searchTerm.length > 0);
  }, [searchTerm]);

  return (
    <div className="relative w-full md:w-1/2">
      <input
        type="text"
        placeholder="Search by name..."
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-1 w-full rounded shadow">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onMouseDown={() => {
                setSearchTerm(s.name.common);
                setShowSuggestions(false);
              }}
            >
              {s.name.common}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
