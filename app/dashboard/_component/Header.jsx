"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { UserCircleIcon } from "lucide-react";

export default function Header() {
  const path = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state for Clerk (replace with actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the timeout duration as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-4 shadow-lg rounded-br-2xl rounded-bl-2xl border-gray-300"
      style={{
        background: "linear-gradient(135deg, #a900e2 0%, #6c00b5 100%)",
        color: "#fff",
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center">
        <Image
          src={"/images/logowhite2.png"}
          width={90} // Adjusted size for better proportions
          height={80}
          alt="logo"
          className="object-contain"
        />
      </div>

      {/* Navigation Menu */}
      <ul
        className="hidden md:flex gap-8 font-medium"
        style={{ fontFamily: "Lovelo, sans-serif" }}
      >
        <li
          className={`hover:text-white hover:font-bold transition cursor-pointer ${
            path == "/dashboard" && "text-white font-bold"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-white hover:font-bold transition cursor-pointer ${
            path == "/dashboard/questions" && "text-white font-bold"
          }`}
        >
          Questions
        </li>
        <li
          className={`hover:text-white hover:font-bold transition cursor-pointer ${
            path == "/dashboard/upgrade" && "text-white font-bold"
          }`}
        >
          Upgrade
        </li>
      </ul>

      {/* User Profile or Loading Placeholder */}
      <div>
        {isLoading ? (
          <UserCircleIcon/>
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
}
