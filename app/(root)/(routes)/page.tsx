import React from "react";
import { auth, currentUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import Movies from "@/components/Movies";
import Favorites from "@/components/Favorites";

const rootPage = async () => {
  const user = await currentUser();
  const userId = auth();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-80">
        <Movies title="Trending Now" />
        <Favorites title="My List" />
      </div>
    </>
  );
};

export default rootPage;
