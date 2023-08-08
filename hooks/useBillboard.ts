/* import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/random",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return {
    data,
    error,
    isLoading,
  };
};

export default useBillboard;
 */
// hooks/useBillboard.ts
import useSWR from "swr";
import axios from "axios";

const fetchBillboard = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};

export const useBillboard = () => {
  const { data, error } = useSWR("/api/random", fetchBillboard);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
