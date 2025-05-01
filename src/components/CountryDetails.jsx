import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaLanguage,
  FaMoneyBill,
  FaUsers,
  FaClock,
  FaMapMarkedAlt,
} from "react-icons/fa";
import CountryMap from "./CountryMap";

const fetchCountryDetails = async (code) => {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  const data = await res.json();
  return data[0];
};

const fetchBorderCountries = async (codes) => {
  const query = codes.join(",");
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${query}`
  );
  return res.json();
};

const CountryDetails = () => {
  const { code } = useParams();

  const {
    data: country,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["country", code],
    queryFn: () => fetchCountryDetails(code),
  });

  const { data: borderCountries, isLoading: isLoadingBorders } = useQuery({
    queryKey: ["borders", country?.borders],
    queryFn: () => fetchBorderCountries(country?.borders || []),
    enabled: !!country?.borders?.length,
  });

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError)
    return <p className="p-4 text-red-500">Error loading country.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Flag */}
      <div className="rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-60 object-cover"
        />
      </div>

      {/* Country Info */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          {country.name.official}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <p>
            <FaGlobe className="inline mr-2 text-blue-500" /> Common Name:{" "}
            <strong>{country.name.common}</strong>
          </p>
          <p>
            <FaLanguage className="inline mr-2 text-green-500" /> Native Name:{" "}
            {Object.values(country.name.nativeName || {})[0]?.common || "N/A"}
          </p>
          <p>
            <FaMapMarkerAlt className="inline mr-2 text-red-500" /> Region:{" "}
            {country.region}
          </p>
          <p>
            <FaMapMarkedAlt className="inline mr-2 text-yellow-500" />{" "}
            Subregion: {country.subregion}
          </p>
          <p>
            <FaUsers className="inline mr-2 text-purple-500" /> Population:{" "}
            {country.population.toLocaleString()}
          </p>
          <p>
            <FaClock className="inline mr-2 text-indigo-500" /> Timezones:{" "}
            {country.timezones?.join(", ")}
          </p>
          <p>
            <FaMoneyBill className="inline mr-2 text-emerald-500" /> Currency:{" "}
            {country.currencies
              ? Object.values(country.currencies)
                  .map((c) => `${c.name} (${c.symbol})`)
                  .join(", ")
              : "N/A"}
          </p>
          <p>
            <FaMapMarkedAlt className="inline mr-2 text-pink-500" /> Area:{" "}
            {country.area.toLocaleString()} km²
          </p>
          <p>
            <FaMapMarkerAlt className="inline mr-2 text-teal-500" /> Capital:{" "}
            {country.capital?.join(", ") || "N/A"}
          </p>
          <p>
            <FaGlobe className="inline mr-2 text-orange-500" /> Languages:{" "}
            {Object.values(country.languages || {}).join(", ")}
          </p>
        </div>
      </div>

      {/* Country Map */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <CountryMap
          latlng={country.latlng}
          name={country.name.common}
          flagUrl={country.flags?.png}
          borders={borderCountries || []}
        />
      </div>

      {/* Border Countries */}
      {country.borders?.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Border Countries
          </h3>
          {isLoadingBorders ? (
            <p>Loading borders...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {borderCountries.map((border) => (
                <Link
                  key={border.cca3}
                  to={`/country/${border.cca3}`}
                  className="flex items-center gap-3 p-3 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition shadow-sm"
                >
                  <img
                    src={border.flags?.png}
                    alt={`Flag of ${border.name.common}`}
                    className="w-8 h-5 object-cover rounded-sm border border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {border.name.common}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
