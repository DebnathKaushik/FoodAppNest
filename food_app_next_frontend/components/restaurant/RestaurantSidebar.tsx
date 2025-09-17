"use client";
import { useRouter } from "next/navigation";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

export default function RestaurantSidebar({ isOpen, closeSidebar }: SidebarProps) {

// router Component
const router = useRouter()


  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-lg z-50 p-6 transition-transform transform">
      <h2 className="text-lg font-semibold mb-6">Menu</h2>
      <ul className="space-y-4">
        <li>
          <button onClick={()=> router.push("restaurant/update")} className="w-full text-left hover:text-gray-300 transition-colors">
            Update Restaurant
          </button>
        </li>
        <li>
          <button onClick={()=>router.push("restaurant/ManageOrders")} className="w-full text-left hover:text-gray-300 transition-colors">
            Manage Orders
          </button>
        </li>
      </ul>

      {/* Close button */}
      <button
        onClick={closeSidebar}
        className="absolute top-4 right-4 text-gray-300 text-xl hover:text-white transition-colors"
      >
        ✕
      </button>
    </div>
  );
}
