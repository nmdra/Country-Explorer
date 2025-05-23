import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CountryCard from "./CountryCard";
import SkeletonCard from "./SkeletonCard";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar"; // 🆕 supports both region + language
import TrendingCountries from "./TrendingCountries";

const ITEMS_PER_PAGE = 24;

const fetchCountries = async () => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,region,languages,cca3,currencies"
  );
  return res.json();
};

const CountryList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [languageFilter, setLanguageFilter] = useState("All");
  const [currencyFilter, setCurrencyFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Build region/language/currency lists
  const regions = Array.from(
    new Set(data?.map((c) => c.region).filter(Boolean))
  ).sort();

  const languages = Array.from(
    new Set(
      data
        ?.flatMap((c) => Object.values(c.languages || {}))
        .filter((lang) => typeof lang === "string")
    )
  ).sort();

  const currencies = Array.from(
    new Set(
      data
        ?.flatMap((c) => Object.values(c.currencies || {}))
        .map((currency) => currency?.name)
        .filter(Boolean)
    )
  ).sort();

  // Filter countries
  const filteredCountries =
    data?.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesRegion =
        regionFilter === "All" || country.region === regionFilter;

      const matchesLanguage =
        languageFilter === "All" ||
        Object.values(country.languages || {}).includes(languageFilter);

      const matchesCurrency =
        currencyFilter === "All" ||
        Object.values(country.currencies || {}).some((currency) =>
          currency.name.toLowerCase().includes(currencyFilter.toLowerCase())
        );

      return (
        matchesSearch && matchesRegion && matchesLanguage && matchesCurrency
      );
    }) || [];

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const paginatedCountries = filteredCountries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const suggestions =
    searchTerm.length > 0
      ? data
          ?.filter((c) =>
            c.name.common.toLowerCase().startsWith(searchTerm.toLowerCase())
          )
          .slice(0, 5)
      : [];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={(term) => {
            setSearchTerm(term);
            setCurrentPage(1);
          }}
          suggestions={suggestions}
        />
        <FilterBar
          regionFilter={regionFilter}
          setRegionFilter={(val) => {
            setRegionFilter(val);
            setCurrentPage(1);
          }}
          languageFilter={languageFilter}
          setLanguageFilter={(val) => {
            setLanguageFilter(val);
            setCurrentPage(1);
          }}
          currencyFilter={currencyFilter}
          setCurrencyFilter={(val) => {
            setCurrencyFilter(val);
            setCurrentPage(1);
          }}
          regions={regions}
          languages={languages}
          currencies={currencies}
        />
      </div>

      {/* Trending Countries */}
      <TrendingCountries />

      {/* Country Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : isError ? (
        <p className="text-red-500">Failed to load countries.</p>
      ) : filteredCountries.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300 mt-6">
          No countries found.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedCountries.map((country, index) => (
              <CountryCard key={index} country={country} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded border text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded border text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CountryList;
