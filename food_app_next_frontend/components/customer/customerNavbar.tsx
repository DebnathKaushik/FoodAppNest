"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  customerName: string;
  onLogout: () => void;
}

export default function CustomerNavbar({ customerName, onLogout }: Props) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-blue-600 text-white flex items-center justify-between px-6 py-3 shadow-md relative">
      {/* Logo */}
      <Link href="/customer" className="flex items-center space-x-2">
        <Image
          src="/logo k.jpg"
          alt="FoodApp Logo"
          width={40}
          height={40}
          className="rounded-lg shadow-md"
        />
        <span className="font-bold text-xl text-yellow-400">FoodApp</span>
      </Link>

       {/* Right side: Orders button + Avatar */}
      <div className="flex items-center space-x-4">
        {/* Orders Button with overlay effect */}
        <button
          onClick={() => router.push("/customer/orderDetails")}
          className="flex items-center justify-center px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white/30 transition shadow-md hover:shadow-lg"
        >
          Order Details
        </button>

        {/* Avatar & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center space-x-2 bg-white/20 p-2 rounded-full hover:bg-white/30 transition"
          >
            <Image
              src="/avatar.png" // default avatar
              alt="Avatar"
              width={35}
              height={35}
              className="rounded-full"
            />
            <span>{customerName}</span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50 overflow-hidden">
              <Link
                href="/customer/update"
                className="block px-4 py-2 hover:bg-gray-100 transition"
                onClick={() => setMenuOpen(false)}
              >
                Update Profile
              </Link>
              <Link
                href="/customer/delete"
                className="block px-4 py-2 hover:bg-gray-100 transition"
                onClick={() => setMenuOpen(false)}
              >
                Delete Account
              </Link>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
