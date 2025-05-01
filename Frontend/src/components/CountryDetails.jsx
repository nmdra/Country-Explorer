import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaGlobe,
  FaMapMarkerAlt,
  FaLanguage,
  FaMoneyBill,
  FaUsers,
  FaClock,
  FaMapMarkedAlt,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import CountryMap from "./CountryMap";
import CountryIntroduction from "./CountryIntroduction";
import {
  addToFavorites,
  removeFromFavorites,
  fetchUserFavorites,
} from "../utils/api.js";

const trackCountrySearch = async (cca3) => {
  try {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/trending/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cca3 }),
    });
  } catch (err) {
    console.error("Failed to track search:", err);
  }
};

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

const Skeleton = ({ className = "" }) => (
  <div
    className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded ${className}`}
  />
);

const CountryDetails = () => {
  const { code } = useParams();
  const queryClient = useQueryClient();

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

  const { data: favorites = [], refetch: refetchFavorites } = useQuery({
    queryKey: ["favorites"],
    queryFn: fetchUserFavorites,
    staleTime: 0,
  });

  const isFavorite = favorites.includes(code);

  const addFavoriteMutation = useMutation({
    mutationFn: () => addToFavorites(code),
    onSuccess: () => {
      toast.success("Added to favorites!");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: () => removeFromFavorites(code),
    onSuccess: () => {
      toast.success("Removed from favorites!");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (err) => toast.error(err.message),
  });

  const handleFavoriteToggle = () => {
    if (!country) return;
    isFavorite ? removeFavoriteMutation.mutate() : addFavoriteMutation.mutate();
  };

  useEffect(() => {
    if (country?.cca3) {
      trackCountrySearch(country.cca3);
    }
  }, [country?.cca3]);

  if (isLoading)
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <Skeleton className="w-full h-60" />
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
          <Skeleton className="h-8 w-2/3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>
        <Skeleton className="w-full h-72" />
      </div>
    );

  if (isError)
    return <p className="p-4 text-red-500">Error loading country.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="relative rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
        <img
          src={country.flags.svg}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-60 object-cover"
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-3 right-3 text-yellow-500 text-3xl bg-white/70 dark:bg-gray-900/70 p-2 rounded-full shadow hover:scale-110 transition-transform"
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorite ? <FaStar /> : <FaRegStar />}
        </button>
      </div>

      <CountryIntroduction
        nameCommon={country.name.common}
        nameOfficial={country.name.official}
      />

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          Summary
        </h3>

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

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <CountryMap
          latlng={country.latlng}
          name={country.name.common}
          flagUrl={country.flags?.png}
          borders={borderCountries || []}
        />
      </div>

      {country.borders?.length > 0 && (
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Border Countries
          </h3>
          {isLoadingBorders ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
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
