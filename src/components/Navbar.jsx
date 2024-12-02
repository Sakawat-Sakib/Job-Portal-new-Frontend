"use client";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  const logOut = async () => {
    await fetch(`${process?.env.NEXT_PUBLIC_API_URL}/user/logout`, {
      cache: "no-cache",
    });
    setUser(null);
    router.push("/login");
  };
  return (
    <div className="text-[#757575] bg-white">
      <div className="flex items-center justify-between px-5 mx-auto max-w-7xl h-16">
        <div className="">
          <Link href="/">
            <h1 className="text-2xl font-bold">
              Job <span className="text-[#FF7043]">Finder</span>
            </h1>
          </Link>
        </div>
        <ul className="flex font-medium items-center gap-5">
          <li className="hover:text-[#FF7043] duration-300 cursor-pointer">
            <Link href="/">Home</Link>
          </li>
          {user?.user ? (
            <>
              {user?.user?.role == "recruiter" ? (
                <>
                  <li className="hover:text-[#FF7043] duration-300 cursor-pointer">
                    <Link href="/dashboard/companies">Companies</Link>
                  </li>
                  <li className="hover:text-[#FF7043] duration-300 cursor-pointer">
                    <Link href="/dashboard/jobs">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:text-[#FF7043] duration-300 cursor-pointer">
                    <Link href="/findjobs">Find Jobs</Link>
                  </li>
                  <li className="hover:text-[#FF7043] duration-300 cursor-pointer">
                    <Link href="/favorite">Favorites</Link>
                  </li>
                </>
              )}

              <li className="hover:text-[#FF7043] duration-300 cursor-pointer">
                <Link href="/profile">Profile</Link>
              </li>
              <li
                className="hover:text-[#FF7043] duration-300 cursor-pointer"
                onClick={logOut}
              >
                Logout
              </li>
            </>
          ) : (
            <>
              <li className="hover:text-[#FF7043] duration-300 cursor-pointer">
                <Link href="/login">login</Link>
              </li>
              <li className="hover:text-[#FF7043] duration-300 cursor-pointer">
                <Link href="/register">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
