import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-gradient-to-r from-green-200 to-blue-300 flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 space-y-6">

      <h1 className="text-4xl font-bold text-center">Food App</h1>

      <Link
        href="/login"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Get Started
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

      <Link
        href="/about"
        className="text-blue-600 hover:underline"
      >
        About Page
      </Link>
    </div>
  );
}
