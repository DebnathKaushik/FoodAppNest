"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantNavbar from "@/components/restaurant/restaurantNavbar";
import RestaurantSidebar from "@/components/restaurant/RestaurantSidebar";
import ProductCard from "@/components/restaurant/productCard";
import { useRouter } from "next/navigation";

export default function RestaurantDashboard() {
  const router = useRouter();

  // Restaurant info
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email?: string;
    address?: string;
    city?: string;
  } | null>(null);

  // Product management
  const [products, setProducts] = useState<any[]>([]);
  const [showProducts, setShowProducts] = useState(false);

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Editing product
  const [editingProduct, setEditingProduct] = useState<{
    id: number;
    product_name: string;
    price: number;
    description: string;
  } | null>(null);

  // Fetch restaurant info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:7000/Restaurant/auth/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    if (showProducts) return setShowProducts(false);
    try {
      const res = await axios.get(`http://localhost:7000/Restaurant/product/${user?.id}`, {
        withCredentials: true,
      });
      setProducts(res.data.products || []);
      setShowProducts(true);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // Delete product
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:7000/Restaurant/product-delete/${id}`, {
        withCredentials: true,
      });
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Edit product
  const handleEdit = (product: { id: number; product_name: string; price: number; description: string }) => {
    setEditingProduct(product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-300 flex flex-col">
      
      {/* Navbar */}
      <RestaurantNavbar
        restaurantName={user?.name || "Restaurant"}
        restaurantAddress={user?.address}
        restaurantCity={user?.city}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Sidebar */}
      <RestaurantSidebar isOpen={sidebarOpen} closeSidebar={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex flex-col items-center w-full px-6 py-8">
        {/* Glass container */}
        <div className="w-full max-w-6xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl p-6 flex flex-col gap-6">
          
          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={fetchProducts}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 backdrop-blur-sm"
            >
              My Products
            </button>

            <button
              onClick={() => router.push("restaurant/create-product")}
              className="px-6 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 backdrop-blur-sm"
            >
              ➕ Create Product
            </button>
          </div>

          {/* Product Edit Modal */}
          {editingProduct && (
            <div className="fixed inset-0 bg-white bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50">
                <div className="bg-white/80 rounded-3xl p-6 w-96 relative shadow-2xl">
                    <h2 className="text-xl font-bold mb-4 text-center">Edit Product</h2>

                <input
                  type="text"
                  className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Product Name"
                  value={editingProduct.product_name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, product_name: e.target.value })
                  }
                />

                <input
                  type="number"
                  className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Price"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: Number(e.target.value) })
                  }
                />

                <textarea
                  className="w-full mb-2 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Description"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                />

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={async () => {
                      try {
                        const res = await axios.patch(
                          `http://localhost:7000/Restaurant/product-update/${editingProduct.id}`,
                          {
                            product_name: editingProduct.product_name,
                            price: editingProduct.price,
                            description: editingProduct.description,
                          },
                          { withCredentials: true }
                        );
                        setProducts(products.map(p => p.id === res.data.id ? res.data : p));
                        setEditingProduct(null);
                      } catch (err) {
                        console.error("Edit failed", err);
                      }
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          {showProducts && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.product_name}
                  description={product.description}
                  price={product.price}
                  onEdit={() => handleEdit(product)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
