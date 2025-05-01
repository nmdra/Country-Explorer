const FilterBar = ({
  regionFilter,
  setRegionFilter,
  languageFilter,
  setLanguageFilter,
  regions,
  languages,
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between w-full">
      {/* Region Filter */}
      <select
        value={regionFilter}
        onChange={(e) => setRegionFilter(e.target.value)}
        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
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
        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
      >
        <option value="All">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
