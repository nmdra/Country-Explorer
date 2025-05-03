import { useNavigate } from "react-router-dom";
import { FiGlobe, FiMapPin, FiFlag } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";

const CountryCard = ({ country }) => {
  const navigate = useNavigate();
  const countryCode = country.cca3 || country.name.common;

  return (
    <div
      onClick={() => navigate(`/country/${countryCode}`)}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg hover:outline-1 hover:outline-blue-500 transition duration-300 cursor-pointer overflow-hidden"
    >
      <figure className="overflow-hidden">
        <img
          src={country.flags.png}
          alt={country.flags.alt || `Flag of ${country.name.common}`}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </figure>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
          <FiGlobe className="text-blue-500" />
          {country.name.common}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 flex items-center gap-2">
          <FiFlag className="text-gray-500" />
          {country.name.official}
        </p>
        {country.capital && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
            <FiMapPin className="text-red-400" />
            {country.capital.join(", ")}
          </p>
        )}
        <div className="mt-4 flex items-center justify-between text-sm text-blue-600 dark:text-blue-400 font-medium">
          <span>View Details</span>
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
