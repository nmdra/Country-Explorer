import { useState } from "react";
import Select from "react-select";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  FaGlobe,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaLanguage,
  FaMoneyBill,
  FaClock,
  FaStar,
} from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fetchCountries = async () => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,region,languages,cca3,currencies"
  );
  return res.json();
};

const fetchCountryDetails = async (name) => {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  const data = await res.json();
  return data[0];
};

const formatOption = (c) => ({
  value: c.name.common,
  label: (
    <div className="flex items-center gap-2">
      <img
        src={c.flags?.png}
        className="w-5 h-4 object-cover"
        alt={`Flag of ${c.name.common}`}
      />
      {c.name.common}
    </div>
  ),
});

const CountryCompare = () => {
  const { data: allCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  const [selected, setSelected] = useState([]);

  const { data: countryA } = useQuery({
    queryKey: ["countryA", selected[0]?.value],
    queryFn: () => fetchCountryDetails(selected[0].value),
    enabled: !!selected[0],
  });

  const { data: countryB } = useQuery({
    queryKey: ["countryB", selected[1]?.value],
    queryFn: () => fetchCountryDetails(selected[1].value),
    enabled: !!selected[1],
  });

  const compareData =
    countryA && countryB
      ? [
          {
            label: "Population",
            [countryA.name.common]: countryA.population || 0,
            [countryB.name.common]: countryB.population || 0,
          },
          {
            label: "Area (km²)",
            [countryA.name.common]: countryA.area || 0,
            [countryB.name.common]: countryB.area || 0,
          },
          {
            label: "Borders",
            [countryA.name.common]: countryA.borders?.length || 0,
            [countryB.name.common]: countryB.borders?.length || 0,
          },
        ]
      : [];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Compare Countries
      </h2>

      <Select
        isMulti
        options={allCountries?.map(formatOption)}
        onChange={(vals) => setSelected(vals.slice(0, 2))}
        value={selected}
        placeholder="Select up to 2 countries"
        className="text-black"
      />

      {countryA && countryB && (
        <>
          {/* General Comparison Table */}
          <div className="overflow-x-auto mt-6 border rounded shadow">
            <table className="min-w-full text-sm text-left bg-white dark:bg-gray-800 border-separate border-spacing-y-1">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white">
                <tr>
                  <th className="p-3 text-sm font-medium"></th>
                  <th className="p-3 text-center font-semibold">
                    <div className="flex flex-col items-center">
                      <img
                        src={countryA.flags?.png}
                        alt={`Flag of ${countryA.name.common}`}
                        className="w-10 h-6 rounded-sm border"
                      />
                      {countryA.name.common}
                    </div>
                  </th>
                  <th className="p-3 text-center font-semibold">
                    <div className="flex flex-col items-center">
                      <img
                        src={countryB.flags?.png}
                        alt={`Flag of ${countryB.name.common}`}
                        className="w-10 h-6 rounded-sm border"
                      />
                      {countryB.name.common}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-gray-200">
                {[
                  [
                    <FaGlobe />,
                    "Official Name",
                    countryA.name.official,
                    countryB.name.official,
                  ],
                  [
                    <FaMapMarkerAlt />,
                    "Region",
                    countryA.region,
                    countryB.region,
                  ],
                  [
                    <FaMapMarkedAlt />,
                    "Subregion",
                    countryA.subregion,
                    countryB.subregion,
                  ],
                  [
                    <FaStar />,
                    "Capital",
                    countryA.capital?.[0],
                    countryB.capital?.[0],
                  ],
                  [
                    <FaClock />,
                    "Timezones",
                    countryA.timezones?.join(", "),
                    countryB.timezones?.join(", "),
                  ],
                  [
                    <FaLanguage />,
                    "Languages",
                    Object.values(countryA.languages || {}).join(", "),
                    Object.values(countryB.languages || {}).join(", "),
                  ],
                  [
                    <FaMoneyBill />,
                    "Currencies",
                    Object.values(countryA.currencies || {})
                      .map((c) => `${c.name} (${c.symbol})`)
                      .join(", "),
                    Object.values(countryB.currencies || {})
                      .map((c) => `${c.name} (${c.symbol})`)
                      .join(", "),
                  ],
                  [
                    <FaGlobe />,
                    "Details",
                    <Link
                      to={`/country/${countryA.cca3}`}
                      className="text-blue-500 underline"
                    >
                      View Page
                    </Link>,
                    <Link
                      to={`/country/${countryB.cca3}`}
                      className="text-blue-500 underline"
                    >
                      View Page
                    </Link>,
                  ],
                ].map(([icon, label, valA, valB], idx) => (
                  <tr key={idx} className="odd:bg-gray-50 dark:odd:bg-gray-700">
                    <td className="px-4 py-2 font-semibold flex items-center gap-2 whitespace-nowrap">
                      {icon} {label}
                    </td>
                    <td className="px-4 py-2">{valA || "N/A"}</td>
                    <td className="px-4 py-2">{valB || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Separate Table for Area, Population, Borders */}
          <div className="overflow-x-auto mt-8 border rounded shadow">
            <table className="min-w-full text-sm text-left bg-white dark:bg-gray-800 border-separate border-spacing-y-1">
              <thead className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white">
                <tr>
                  <th className="p-3">Metric</th>
                  <th className="p-3 text-center">{countryA.name.common}</th>
                  <th className="p-3 text-center">{countryB.name.common}</th>
                </tr>
              </thead>
              <tbody className="text-gray-800 dark:text-gray-200">
                {[
                  [
                    "Population",
                    countryA.population?.toLocaleString(),
                    countryB.population?.toLocaleString(),
                  ],
                  [
                    "Area (km²)",
                    countryA.area?.toLocaleString(),
                    countryB.area?.toLocaleString(),
                  ],
                  [
                    "Borders",
                    countryA.borders?.length || 0,
                    countryB.borders?.length || 0,
                  ],
                ].map(([label, valA, valB], idx) => (
                  <tr key={idx} className="odd:bg-gray-50 dark:odd:bg-gray-700">
                    <td className="px-4 py-2 font-semibold whitespace-nowrap">
                      {label}
                    </td>
                    <td className="px-4 py-2 text-center">{valA || "N/A"}</td>
                    <td className="px-4 py-2 text-center">{valB || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Population Chart */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Population Comparison
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={compareData.filter((data) => data.label === "Population")}
              >
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey={countryA.name.common} fill="#8884d8" />
                <Bar dataKey={countryB.name.common} fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Area Chart */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              Area Comparison (km²)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={compareData.filter((data) => data.label === "Area (km²)")}
              >
                <XAxis dataKey="label" />
                <YAxis />
                <Tooltip />
                <Bar dataKey={countryA.name.common} fill="#8884d8" />
                <Bar dataKey={countryB.name.common} fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CountryCompare;
