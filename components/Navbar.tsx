"use client";

import React, { useCallback, useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import { cn } from "@/lib/utils";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setSetshowMobileMenu] = useState(false);

  const [showAccountMenu, setSetshowAccountMenu] = useState(false);

  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setSetshowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setSetshowAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={cn(
          "px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ",
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        )}
      >
        <img src="/images/logo.png" alt="Logo" className="h-4 lg:h-7" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
          onClick={toggleMobileMenu}
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={cn(
              "text-white transition ease-in-out",
              showMobileMenu ? "rotate-180" : "rotate-0"
            )}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex  ml-auto gap-7 items-center ">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>

          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer relative"
            onClick={toggleAccountMenu}
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-red.png" alt="Logo" />
            </div>
            <BsChevronDown
              className={cn(
                "text-white transition ease-in-out",
                showAccountMenu ? "rotate-180" : "rotate-0"
              )}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
