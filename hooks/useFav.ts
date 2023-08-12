import useSWR from "swr";

// Fetcher function to get data from the API
export const fetcher = async (url: string) => {
  const response = await fetch(url);
  console.log("Response status:", response.status);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  return response.json();
};

// Custom hook to fetch favorites data
const UseFav = () => {
  const { data, error } = useSWR("/api/favorites", fetcher);

  return {
    favorites: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default UseFav;
