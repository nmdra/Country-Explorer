const RegionFilter = ({ regionFilter, setRegionFilter, regions }) => (
  <select
    value={regionFilter}
    onChange={(e) => setRegionFilter(e.target.value)}
    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded w-full md:w-1/4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
  >
    <option value="All">All Regions</option>
    {regions.map((region) => (
      <option key={region} value={region}>
        {region}
      </option>
    ))}
  </select>
);

export default RegionFilter;
