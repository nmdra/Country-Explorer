import { useQuery } from "@tanstack/react-query";
import CountryCard from "../components/CountryCard";
import SkeletonCard from "../components/SkeletonCard";
import { useAuth } from "../context/AuthContext";

// Get favorite cca3 codes
const fetchFavoriteCodes = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/api/user/favorites`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch favorites");
  return data;
};

// Get full country details from REST Countries API
const fetchCountryDetails = async (codes) => {
  if (codes.length === 0) return [];
  const res = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${codes.join(",")}`
  );
  const data = await res.json();
  return data;
};

const FavoritesPage = () => {
  const { userEmail } = useAuth();

  const {
    data: favoriteCodes = [],
    isLoading: loadingFavorites,
    isError: errorFavorites,
    error: errorFav,
  } = useQuery({
    queryKey: ["favoriteCodes"],
    queryFn: fetchFavoriteCodes,
    enabled: !!userEmail,
  });

  const {
    data: countries = [],
    isLoading: loadingCountries,
    isError: errorCountries,
    error: errorCountry,
  } = useQuery({
    queryKey: ["favoriteDetails", favoriteCodes],
    queryFn: () => fetchCountryDetails(favoriteCodes),
    enabled: favoriteCodes.length > 0,
  });

  if (loadingFavorites || loadingCountries) {
    return (
      <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (errorFavorites || errorCountries) {
    return (
      <p className="text-red-500">
        Error: {errorFav?.message || errorCountry?.message}
      </p>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        ⭐ My Favorite Countries
      </h2>

      {countries.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          You have no favorites yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
