import { useQuery } from "@tanstack/react-query";

// Line Skeleton Loader
const LineSkeleton = ({ width = "100%" }) => (
  <div
    className="h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"
    style={{ width }}
  />
);

// Fetch Wikipedia Summary
const fetchWikipediaIntro = async (title) => {
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`,
  );
  if (!res.ok) throw new Error("Wikipedia summary not found");
  return res.json();
};

const CountryIntroduction = ({ nameCommon, nameOfficial }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["wikipedia", nameOfficial],
    queryFn: () => fetchWikipediaIntro(nameOfficial),
  });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-3">
        <LineSkeleton width="30%" />
        <LineSkeleton width="100%" />
        <LineSkeleton width="95%" />
        <LineSkeleton width="90%" />
        <LineSkeleton width="80%" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <p className="text-red-500">Failed to load introduction.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        {nameCommon || data.title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">{data.extract}</p>
      {data.content_urls?.desktop?.page && (
        <a
          href={data.content_urls.desktop.page}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Read more on Wikipedia →
        </a>
      )}
    </div>
  );
};

export default CountryIntroduction;
