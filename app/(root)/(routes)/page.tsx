import React from "react";
import { UserButton, currentUser, auth } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

const rootPage = async () => {
  const user = await currentUser();

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default rootPage;
