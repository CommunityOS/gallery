import React from "react";
import Link from "next/link";
import CommunityOSLogo from "../Icons/JSChileLogo";

export const Nav = () => {
  return (
    <div className="h-20 flex flex-row justify-between items-center px-4 gap-8 border-b border-b-gray-600">
      <Link href="/">
        <CommunityOSLogo color="#fff" className="w-[175px]" />
      </Link>
      <div className="flex flex-1 justify-center">
        <p className="text-md md:text-lg font-bold">CommunityOS — Galería</p>
      </div>
    </div>
  );
};
