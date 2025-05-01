const SkeletonCard = () => (
  <div
    role="status"
    className="w-full p-4 bg-white dark:bg-gray-800 rounded shadow animate-pulse"
  >
    <div className="h-48 bg-gray-200 rounded-md dark:bg-gray-700 mb-4"></div>
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default SkeletonCard;
