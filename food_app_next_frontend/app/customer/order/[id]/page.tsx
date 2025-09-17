"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import CustomerNavbar from "@/components/customer/customerNavbar";
import CustomerSidebar from "@/components/customer/customerSidebar";

interface Product {
  id: number;
  product_name: string;
  price: string;
  description: string;
}

interface Restaurant {
  id: number;
  restaurant_name: string;
  city: string;
  address: string;
  phone: string;
  products: Product[];
}

export default function RestaurantMenuPage() {
  const { id } = useParams(); 
  const router = useRouter();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null); // for restaurent products
  const [loading, setLoading] = useState(true); // for loading  effect
  const [sidebarOpen, setSidebarOpen] = useState(false); // for side bar 
  const [customerName, setCustomerName] = useState("Customer"); // For customer detials 
  const [showRestaurantDetails, setShowRestaurantDetails] = useState(false); // for restaurent Details


  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get("http://localhost:7000/Customer/auth/me", {
          withCredentials: true,
        });
        setCustomerName(res.data.customer_name);
      } catch {
        router.push("/auth/customer-login");
      }
    };

    const fetchRestaurantProducts = async () => {
      try {
        const res = await axios.get<Restaurant>(`http://localhost:7000/Restaurant/product/${id}`);
        setRestaurant(res.data);
      } catch (err) {
        console.error("Error fetching restaurant products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCustomer(); // For show name in navbar (right side)
      fetchRestaurantProducts(); // For that specific restaurent -> all Products  
    }
  }, [id, router]);

  const handleLogout = async () => {
    await axios.post("http://localhost:7000/Customer/auth/logout",{},{ withCredentials: true }
    );
    router.push("/auth/customer-login");
  };


  // For handle the Order Now 
  const handleOrderNow = async (productId: number) => {
    try {
      const res = await axios.post("http://localhost:7000/Orders/create",
        {
          products: [{ productId, quantity: 1 }], // default 1 for now
        },
        { withCredentials: true }
      );

      await Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been placed successfully and is pending confirmation.",
      });
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text: "Could not place your order. Try again!",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
        <p className="text-lg text-gray-200 animate-pulse">Loading menu...</p>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
        <p className="text-lg text-red-400">Restaurant not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
      <CustomerNavbar
        customerName={customerName}
        onLogout={handleLogout}
      />
      <CustomerSidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />



      <main className="p-6">

        {/* Sub-header below navbar */}
        <div className="relative mb-6">
        {/* Clickable restaurant name */}
        <button
            onClick={() => setShowRestaurantDetails(!showRestaurantDetails)}
            className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 text-white font-bold shadow-md hover:shadow-xl transition"
        >
           Create Order with  {restaurant.restaurant_name} 
        </button>

        {/* Dropdown details */}
        {showRestaurantDetails && (
            <div className="mt-2 w-72 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-lg text-white z-50">
            <p className="font-semibold text-lg">{restaurant.restaurant_name}</p>
            <p className="text-gray-200">{restaurant.city} • {restaurant.address}</p>
            <p className="text-gray-300">📞 {restaurant.phone}</p>
            </div>
        )}
        </div>


        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.products.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition"
            >
                <div className="flex items-center justify-between w-full">
                    <h2 className="text-xl font-bold text-white mb-2">{product.product_name}</h2>
                    <h2 className="text-xl font-bold text-white ">{product.id}</h2>
                </div>
              <p className="text-gray-300 mb-2">{product.description}</p>
              <p className="text-yellow-300 font-semibold mb-4">💲{product.price}</p>
              <button
                className="w-full bg-gradient-to-r from-green-400 to-teal-500 text-white py-2 px-4 rounded-lg hover:from-green-500 hover:to-teal-600 transition shadow-md hover:shadow-xl"
                onClick={() => handleOrderNow(product.id)}
              >
                Order Now 🛒
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
