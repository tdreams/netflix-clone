import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

const Profiles = async () => {
  const user = await currentUser();

  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center ">
          Who is watching
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <Link href="/">
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
                <img src="/images/default-red.png" alt="Profile" />
              </div>
              <div className="mt-4 text-muted-foreground text-2xl text-center group-hover:text-white">
                {user?.firstName || user?.username}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profiles;
