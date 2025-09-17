"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "@/components/customer/customerNavbar";
import CustomerSidebar from "@/components/customer/customerSidebar";
import { useRouter } from "next/navigation";

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
  status?: string; // optional if backend will provide status per product
  product: Product;
}

interface Order {
  id: number;
  status: string;
  totalPrice: string;
  createdAt: string;
  restaurant: {
    id: number;
    restaurant_name: string;
    email: string;
    phone: string;
    address: string;
  };
  orderDetails: OrderDetail[];
}

export default function CustomerOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [customerName, setCustomerName] = useState("Customer");
  const router = useRouter();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get("http://localhost:7000/Customer/auth/me", {
          withCredentials: true,
        });
        setCustomerName(res.data.customer_name);
      } catch {
        router.push("/auth/customer-login");
      }finally {
        setLoading(false); // stop loading
    }
    };

    
    const fetchOrders = async () => {
    try {
        const res = await axios.get("http://localhost:7000/Orders/customer", {
        withCredentials: true,
        });
        setOrders(res.data);
    } catch (err) {
        console.error(err);
    }
    };


    fetchCustomer();
    fetchOrders();
  }, [router]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
        <p className="text-gray-200 text-lg animate-pulse">Loading orders...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900">
      <CustomerNavbar
        customerName={customerName}
        onLogout={() => router.push("/auth/customer-login")}
      />
      <CustomerSidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      <main className="p-6">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-gray-300 text-center">No orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-white">
                    Order #{order.id} - {order.restaurant.restaurant_name}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "pending"
                        ? "bg-yellow-500 text-black"
                        : order.status === "confirmed"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-300 mb-2">
                  Date: {new Date(order.createdAt).toLocaleString()}
                </p>

                <h3 className="text-white font-semibold mb-2">Products:</h3>
                <ul className="space-y-2">
                  {order.orderDetails.map((detail) => (
                    <li
                      key={detail.id}
                      className="flex justify-between text-gray-200 bg-white/10 p-2 rounded-lg"
                    >
                      <span>
                        {detail.product.product_name} (x{detail.quantity})
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          order.status === "pending"
                            ? "bg-yellow-500 text-black"
                            : order.status === "confirmed"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 text-right text-yellow-300 font-bold">
                  Total: 💲{order.totalPrice}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
