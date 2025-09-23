"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import CustomerNavbar from "@/components/customer/customerNavbar";
import CustomerSidebar from "@/components/customer/customerSidebar";
import Pusher from "pusher-js";

interface Restaurant {
  id: number;
  restaurant_name: string;
  address: string;
  city: string;
  phone: string;
  image?: string;
}

export default function CustomerDashboard() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customer, setCustomer] = useState<{ id: number; customer_name: string } | null>(null);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // Fetch customer info
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get("http://localhost:7000/Customer/auth/me", {
          withCredentials: true,
        });
        setCustomer(res.data);
      } catch (err) {
        console.error(err);
        router.push("/auth/customer-login");
      }
    };
    fetchCustomer();
  }, []);

  // Fetch restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get("http://localhost:7000/Restaurant/all-restaurant");
        setRestaurants(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); //stop loading when all Restuarents comes in UI (frontend)
      }
    };
    fetchRestaurants();
  }, []);

  const handleLogout = async () => {
    await axios.post("http://localhost:7000/Customer/auth/logout", {}, { withCredentials: true });
    router.push("/auth/customer-login");
  };

  return (
    <div>
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {notification}
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-tr from-blue-600  to-blue-800 backdrop-blur-sm">
        <CustomerNavbar customerName={customer?.customer_name || "Customer"} onLogout={handleLogout} />
        <CustomerSidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

        <main className="p-6">
          <h1 className="text-2xl mb-2 border-2 inline-block bg-gray-400 p-2">All Restaurants</h1>

          {/* here is Loader (size) and Spin machanism*/ }
          {loading ? (
            <div className="flex justify-center items-center h-50"> 
                <div className="w-16 h-16 border-8 border-white/20 border-t-white/80 rounded-full animate-spin"></div>
                <p className="text-white mt-4">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((rest) => (
                <div
                  key={rest.id}
                  className="bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col hover:scale-105 duration-300"
                >
                  <div className="h-48 w-full rounded-2xl overflow-hidden mb-4 border border-white/10">
                    <img
                      src={rest.image || "/food.jpg"}
                      alt={rest.restaurant_name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <p className="text-center text-white text-3xl font-bold mb-1 drop-shadow-md">{rest.restaurant_name}</p>
                  <p className="text-center text-gray-200 text-sm mb-1">{rest.city}</p>
                  <p className="text-center text-gray-300 text-sm mb-2">{rest.address}</p>
                  <p className="text-center text-gray-200 text-sm mb-3">📞 {rest.phone}</p>

                  <button
                    className="mt-auto bg-gradient-to-r from-green-400 to-teal-500 text-white py-2 px-4 rounded-xl hover:from-green-500 hover:to-teal-600 transition shadow-md hover:shadow-xl"
                    onClick={() => router.push(`/customer/order/${rest.id}`)}
                  >
                    View Menu
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
