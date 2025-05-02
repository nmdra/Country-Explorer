import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Skeleton = ({ className = "" }) => (
  <div
    className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`}
  />
);

const TrendingCountries = () => {
  const [trending, setTrending] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch trending cca3s and sort by count
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`/api/trending?limit=5`);
        const data = await res.json();
        const sortedTrending = (data.trending || []).sort(
          (a, b) => b.count - a.count
        );
        setTrending(sortedTrending);
      } catch (err) {
        console.error("Failed to fetch trending countries", err);
      }
    };

    fetchTrending();
  }, []);

  // Fetch full country data by sorted cca3s
  useEffect(() => {
    const fetchCountryDetails = async () => {
      if (trending.length === 0) return;

      try {
        const cca3List = trending.map((item) => item.cca3).join(",");
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha?codes=${cca3List}`
        );
        const data = await res.json();

        // Sort countries based on trending order
        const sortedCountries = trending
          .map((trend) => data.find((c) => c.cca3 === trend.cca3))
          .filter(Boolean);

        setCountries(sortedCountries);
      } catch (err) {
        console.error("Failed to fetch country details", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [trending]);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        🔥 Trending Countries Today
      </h3>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {countries.map((country) => (
            <Link
              key={country.cca3}
              to={`/country/${country.cca3}`}
              className="flex items-center gap-3 p-3 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition shadow-sm"
            >
              <img
                src={country.flags?.png}
                alt={`Flag of ${country.name.common}`}
                className="w-8 h-5 object-cover rounded-sm border border-gray-300"
              />
              <span className="text-sm font-medium text-gray-800 dark:text-white">
                {country.name.common}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrendingCountries;
