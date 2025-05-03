const FilterBar = ({
  regionFilter,
  setRegionFilter,
  languageFilter,
  setLanguageFilter,
  currencyFilter,
  setCurrencyFilter,
  regions,
  languages,
  currencies,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full md:w-[60%]">
      {/* Region Filter */}
      <select
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
        bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
        hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="All">All Regions</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {/* Language Filter */}
      <select
        value={languageFilter}
        onChange={(e) => setLanguageFilter(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
        bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
        hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="All">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>

      {/* Currency Filter */}
      <select
        value={currencyFilter}
        onChange={(e) => setCurrencyFilter(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 
        bg-white dark:bg-gray-900 text-gray-900 dark:text-white 
        hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        <option value="All">All Currencies</option>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
