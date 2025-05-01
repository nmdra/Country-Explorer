const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/user/favorites`;

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const addToFavorites = async (cca3) => {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ cca3 }),
  });
  if (!res.ok) throw new Error("Failed to add to favorites");
  return await res.json();
};

export const removeFromFavorites = async (cca3) => {
  const res = await fetch(API_BASE, {
    method: "DELETE",
    headers: getAuthHeaders(),
    body: JSON.stringify({ cca3 }),
  });
  if (!res.ok) throw new Error("Failed to remove from favorites");
  return await res.json();
};

export const fetchUserFavorites = async () => {
  const res = await fetch(API_BASE, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch favorites");
  return await res.json();
};
