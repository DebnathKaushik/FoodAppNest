import Link from "next/link";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-green-400 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 text-white flex items-center justify-between px-6 py-3 shadow-md">
        {/* Left: Logo (back to home) */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo k.jpg"
            alt="food logo"
            width={50}
            height={40}
            className="rounded-lg shadow-md"
          />
          <span className="font-bold text-xl text-yellow-400">FoodApp</span>
        </Link>

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

      {/* Page Content */}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
