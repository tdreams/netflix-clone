import React from "react";
import { UserButton, currentUser, auth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";

const rootPage = async () => {
  const user = await currentUser();

  return (
    <div>
      <Navbar />
      <Billboard />
    </div>
  );
};

export default rootPage;
