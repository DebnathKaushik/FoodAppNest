"use client";
import Link from "next/link";

interface Props {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function CustomerSidebar({ isOpen, closeSidebar }: Props) {
  return (
    <div
      className={`fixed inset-0 bg-black/50 z-40 transition-opacity ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={closeSidebar}
    >
      <div
        className={`absolute left-0 top-0 w-64 h-full bg-white p-6 shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">Customer Menu</h2>
        <ul className="space-y-3">
          <li>
            <Link href="/customer/order-history" className="hover:text-blue-600 transition">
              Order History
            </Link>
          </li>
          <li>
            <Link href="/customer/restaurants" className="hover:text-blue-600 transition">
              Restaurants
            </Link>
          </li>
          <li>
            <Link href="/customer/profile" className="hover:text-blue-600 transition">
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
