"use client";
import useSWR from "swr";
import axios from "axios";

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching user data");
  }
};

const UseCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/currentUser",
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default UseCurrentUser;
