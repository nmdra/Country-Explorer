import { useState, useEffect, useRef } from "react";

const SearchBar = ({ searchTerm, setSearchTerm, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef(null);

  useEffect(() => {
    setShowSuggestions(searchTerm.length > 0);
    setActiveIndex(-1); // reset highlight on search change
  }, [searchTerm]);

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev === -1
          ? suggestions.length - 1
          : (prev - 1 + suggestions.length) % suggestions.length
      );
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        setSearchTerm(suggestions[activeIndex].name.common);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full md:w-1/2">
      <input
        type="text"
        placeholder="Search by name..."
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-1 w-full rounded shadow"
        >
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              className={`px-4 py-2 cursor-pointer ${
                idx === activeIndex
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
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
