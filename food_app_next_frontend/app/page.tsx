import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
            className="rounded-lg shadow-md"
          />
          <span className="font-bold text-xl text-yellow-400">FoodApp</span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-grow p-4 space-y-6">
        <h1 className="text-yellow-600 italic text-5xl font-bold text-center">
          Eat Healthy Stay Healthy
        </h1>

        <div className="w-full max-w-6xl flex items-center justify-center gap-4 overflow-x-hidden">
          {/* Left image */}
          <Image
            src="/foodimage.avif"
            alt="food image 1"
            width={400}
            height={300}
            className="rounded-lg shadow-lg w-full h-auto flex-[0.9]"
          />

          {/* Middle image (bigger) */}
          <Image
            src="/food-image-2.jpg"  
            alt="food image 2"
            width={600}
            height={200}
            className="rounded-lg shadow-lg w-full h-auto flex-[1.2]"
          />

          {/* Right image */}
          <Image
            src="/food-image-3.jpg"  
            alt="food image 3"
            width={400}
            height={300}
            className="rounded-lg shadow-lg w-full h-auto flex-[0.9]"
          />
        </div>

        {/* Customer & Restaurant Links below main content */}
        <div className="flex space-x-4 mt-2">
          <Link
            href="/auth/customer-login"
            className="bg-green-700 hover:bg-green-800 px-6 py-3 rounded-lg text-white font-semibold transition transform hover:scale-105"
          >
            Get started with Customer
          </Link>
          <Link
            href="/auth/restaurant-login"
            className="bg-blue-700 hover:bg-blue-800 px-6 py-3 rounded-lg text-white font-semibold transition transform hover:scale-105"
          >
            Get started with Restaurant
          </Link>
        </div>
      </main>
    </div>
  );
}
