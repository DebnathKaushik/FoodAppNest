"use client";

import RestaurantLogoutButton from "./restaurantLogoutButton";


interface NavbarProps {
  restaurantName: string;
  restaurantAddress?: string;
  restaurantCity?: string;
  toggleSidebar: () => void;
}

export default function RestaurantNavbar({
  restaurantName,
  restaurantAddress,
  restaurantCity,
  toggleSidebar,
}: NavbarProps) {
  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white shadow-md px-6 py-4">
      {/* Left - 3 dot menu */}
      <button
        onClick={toggleSidebar}
        className="text-2xl hover:text-gray-300 transition-colors"
      >
        ☰
      </button>

      {/* Center-left - Restaurant info */}
      <div className="flex flex-col text-left -ml-190">
        <h1 className="text-2xl font-bold ">{restaurantName}</h1>
        {(restaurantAddress || restaurantCity) && (
          <p className="text-sm text-gray-300">
            {restaurantAddress ? restaurantAddress : ""}{" "}
            {restaurantCity ? `, ${restaurantCity}` : ""}
          </p>
        )}
      </div>

      {/* Right - Logout */}
      <RestaurantLogoutButton />
    </nav>
  );
}
