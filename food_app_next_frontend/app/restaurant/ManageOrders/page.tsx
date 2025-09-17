"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Product {
  id: number;
  product_name: string;
  price: string;
  description: string;
}

interface OrderDetail {
  id: number;
  quantity: number;
  price: string;
  product: Product;
}

interface Order {
  id: number;
  status: string;
  totalPrice: string;
  createdAt: string;
  customer: {
    id: number;
    customer_name: string;
    email: string;
  };
  orderDetails: OrderDetail[];
  restaurant: {
    id: number;
    restaurant_name: string;
  };
}

export default function RestaurantOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [restaurantName, setRestaurantName] = useState("");
  const router = useRouter();

  const fetchOrders = async () => {
    try {
        // for Proteced route auth (restaurent)
      const res = await axios.get("http://localhost:7000/Orders/restaurant", {
        withCredentials: true,
      });
      setOrders(res.data);
      if (res.data.length > 0) {
        setRestaurantName(res.data[0].restaurant.restaurant_name); // get restaurant name from first order
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: number, status: "confirmed" | "cancelled") => {
    try {
      await axios.patch(`http://localhost:7000/Orders/${orderId}/status`,{ status },
        { withCredentials: true }
      );
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <p>Loading orders...</p>
      </div>
    );

  return (

    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Top Header: Restaurant name + Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded shadow-md"
          onClick={() => router.push("/restaurant")}
        >
          <Image src="/logo k.jpg" alt="Back" width={20} height={20} />
          Back
        </button>
        <h1 className="text-3xl font-bold">{restaurantName || "Restaurant Orders"}</h1>
        <div></div> {/* placeholder to keep space */}
      </div>

      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-gray-800 p-4 rounded-xl shadow-md">
              <div className="flex justify-between mb-2">
                <h2>Order #{order.id} - {order.customer.customer_name}</h2>
                <span
                  className={`px-2 py-1 rounded 
                    ${order.status === "pending"? 
                    "bg-yellow-500 text-black"
                    : order.status === "confirmed"  
                      ? "bg-green-600"
                      : "bg-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <ul className="mb-2">
                {order.orderDetails.map((od) => (
                  <li key={od.id} className="flex justify-between">
                    <span>{od.product.product_name} x{od.quantity}</span>
                    <span>💲{od.price}</span>
                  </li>
                ))}
              </ul>
              {/* if status Pending show Confirm and cancel button */}
              {order.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    className="bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                    onClick={() => handleUpdateStatus(order.id, "confirmed")}
                  >
                    Confirm
                  </button>
                  <button
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
                    onClick={() => handleUpdateStatus(order.id, "cancelled")}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
