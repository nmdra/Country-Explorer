import { useMutation } from "@tanstack/react-query";

export const useRegisterMutation = () =>
  useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      return data;
    },
  });
