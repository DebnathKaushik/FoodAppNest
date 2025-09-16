"use client";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RestaurantLogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:7000/Restaurant/auth/logout", {}, { withCredentials: true });
      router.push("/auth/restaurant-login");
    } catch (err) {
      console.error("Restaurant logout failed:", err);
    }
  };

  return (
    <button
      onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500/80 text-white rounded hover:bg-red-600">
      Logout
    </button>
  );
}
