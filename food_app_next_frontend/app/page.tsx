'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {


    const [images, setImages] = useState([
    "/foodone.jpg",
    "/food-image-2.jpg",
    "/lt.jpg",
  ]);

  // Auto slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setImages((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first]; // move first image to end
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-300 to-green-400 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 text-white flex items-center justify-between px-6 py-3 shadow-md">

        {/* Left: Logo */}
        <Link href={"/"} className="flex items-center space-x-2">
          <Image
            src="/logo k.jpg"
            alt="food logo"
            width={50}
            height={40}
            className="rounded-lg shadow-md animate-spin"
          />
          <span className="font-bold text-xl text-yellow-400">Food Mania</span>
        </Link>

        {/* Customer & Restaurant Links below main content */}
        <div className="flex ml-auto space-x-4 mr-4">
          <Link
            href="/auth/customer-login"
            className="bg-amber-500 hover:text-red-600 px-6 py-3 rounded-full text-white font-semibold transition transform hover:scale-105"
          >
            Customer
          </Link>
          <Link
            href="/auth/restaurant-login"
            className="bg-amber-500 hover:text-red-600 px-6 py-3 rounded-full text-white font-semibold transition transform hover:scale-105"
          >
             Restaurant
          </Link>
        </div>


        {/* Right: Nav Links */}
        <div className="flex space-x-6">
          <Link href="/about" className="hover:text-yellow-300">
            About
          </Link>
          <Link href="/contact" className="hover:text-yellow-300">
            Contact
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex  flex-col items-center justify-center flex-grow p-4 space-y-20">
        <h1 className="bg-teal-500 text-purple-950 text-5xl font-bold border-4 border-sky-500 rounded-lg p-4">
          Fast, Fresh Food
          & Right To Your Door
        </h1>
         

        {/* Image Content */}
       <div className="w-full max-w-6xl overflow-hidden relative mx-auto my-2">
        <div className="flex gap-4 transition-transform duration-700">
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-[400px] h-[300px]">
            <Image
              src={src}
              alt={`Food ${index + 1}`}
              width={400}
              height={300}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </div>
    </div>
        
      </main>
    </div>
  );
}
