const CountryCard = ({ country }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
    <img
      src={country.flags.png}
      alt={country.flags.alt || `Flag of ${country.name.common}`}
      className="w-full h-40 object-cover rounded mb-4"
    />
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
      {country.name.common}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-300">
      {country.name.official}
    </p>
  </div>
);

export default CountryCard;
