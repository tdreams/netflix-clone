import React from "react";
import { UserButton, currentUser, auth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import Movies from "@/components/Movies";

const rootPage = async () => {
  const user = await currentUser();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-80">
        <Movies title="Trending Now" />
        <Movies title="My List" />
      </div>
    </>
  );
};

export default rootPage;
