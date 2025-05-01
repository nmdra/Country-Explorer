import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const RECENT_KEY = "recentCountrySearches";

const SearchBar = ({ searchTerm, setSearchTerm, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);
  const listRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
    setRecentSearches(saved);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
    setShowSuggestions(searchTerm.length > 0);

    const exactMatch = suggestions.find(
      (s) => s.name.common.toLowerCase() === searchTerm.toLowerCase()
    );
    if (exactMatch) {
      setShowSuggestions(false);
      handleNavigate(exactMatch);
    }
  }, [searchTerm, suggestions]);

  const handleNavigate = (country) => {
    const updated = [
      country,
      ...recentSearches.filter((r) => r.cca3 !== country.cca3),
    ].slice(0, 5); // keep latest 5
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    setRecentSearches(updated);

    navigate(`/country/${country.cca3}`);
  };

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
    } else if (e.key === "Enter" && activeIndex >= 0) {
      const selected = suggestions[activeIndex];
      setSearchTerm(selected.name.common);
      setShowSuggestions(false);
      handleNavigate(selected);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const handleBlur = () => {
    // Delay hiding to allow item click
    setTimeout(() => setShowSuggestions(false), 100);
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
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />

      {showSuggestions && (
        <ul
          ref={listRef}
          className="absolute z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 mt-1 w-full rounded shadow max-h-64 overflow-y-auto"
        >
          {searchTerm.length > 0 && suggestions.length > 0 ? (
            suggestions.map((s, idx) => (
              <li
                key={s.cca3}
                className={`px-4 py-2 cursor-pointer ${
                  idx === activeIndex
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                onMouseDown={() => {
                  setSearchTerm(s.name.common);
                  setShowSuggestions(false);
                  handleNavigate(s);
                }}
              >
                {s.name.common}
              </li>
            ))
          ) : recentSearches.length > 0 ? (
            <>
              <li className="px-4 py-2 text-xs text-gray-500 uppercase">
                Recent Searches
              </li>
              {recentSearches.map((r) => (
                <li
                  key={r.cca3}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onMouseDown={() => {
                    setSearchTerm(r.name.common);
                    handleNavigate(r);
                  }}
                >
                  {r.name.common}
                </li>
              ))}
            </>
          ) : (
            <li className="px-4 py-2 text-gray-500">No results</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
