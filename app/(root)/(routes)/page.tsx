import React from "react";
import { auth, currentUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";

import MovieList from "@/components/MovieList";
import useMovL from "@/hooks/useMovL";
import UseFav from "@/hooks/useFav";

const rootPage = async () => {
  const user = await currentUser();
  const userId = auth();

  return (
    <>
      <Navbar />
      <Billboard />
    </>
  );
};

export default rootPage;
