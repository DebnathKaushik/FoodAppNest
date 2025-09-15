import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-gradient-to-r from-blue-200 to-green-400 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-6">

      <h1 className="text-yellow-600 italic text-4xl font-bold text-center">Eat Healthy Stay Healthy</h1>

      <Link href={"/"}>
        <div className=" absolute top-4 left-4">
          <Image
            src="/logo k.jpg"
            alt="food logo"
            width={60}
            height={40}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </Link>
      

      <Link
        href="/auth/customer-login"
        className=" absolute top-6 right-60 bg-red-800 text-white px-6 py-2 rounded-lg hover:bg-red-900 transition"
      >
        Get Started Customer
      </Link>

      <Link
        href="/auth/restaurant-login"
        className="absolute top-6 right-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Get Started Restaurant
      </Link>

      <div className="w-full max-w-xl">
        <Image
          src="/foodimage.avif"
          alt="food image"
          width={800}
          height={400}
          className="rounded-lg shadow-lg mx-auto"
        />
      </div>

    </div>
  );
}
