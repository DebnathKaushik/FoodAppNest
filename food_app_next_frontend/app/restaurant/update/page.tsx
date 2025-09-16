"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

// ✅ Zod Schema for validation
const UpdateRestaurantSchema = z.object({
  id: z.number(), // required for update
  restaurant_name: z
    .string()
    .min(3, "Restaurant name must be at least 3 characters")
    .max(50, "Restaurant name must be less than 50 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  phone: z.string().min(11, "Phone number must be 11 digits"),
  address: z.string().min(3, "Address must be at least 3 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
});

export default function UpdateRestaurant() {

  // show and hide password 
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // State for restaurant form data
  const [formData, setFormData] = useState({
    id: 0,
    restaurant_name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "", // keep empty so user enters new password
  });

  //  Fetch restaurant info and fill form automatically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:7000/Restaurant/auth/me", {
          withCredentials: true,
        });

        setFormData({
          id: res.data.id || 0,
          restaurant_name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          address: res.data.address || "",
          city: res.data.city || "",
          password: "", // always blank on load
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  //  Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Handle update submit
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // Validate form data (you can still include id in schema for local validation)
    UpdateRestaurantSchema.parse(formData);

    // Remove id from body
    const { id, ...updateData } = formData;

    // Send PATCH request
    await axios.patch(
      `http://localhost:7000/Restaurant/update/${id}`,
      updateData,
      { withCredentials: true }
    );

    await Swal.fire({
      icon: "success",
      title: "Update Successful!",
      text: "Your restaurant details have been updated.",
      confirmButtonText: "OK",
    });

    router.push("/restaurant");
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      const messages = err.issues.map((issue) => issue.message).join("<br/>");
      Swal.fire({
        title: "Validation Error",
        html: messages,
        icon: "error",
      });
    } else {
      console.error("Something went wrong:", err);
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  }
};


  return (
    <div className="bg-gradient-to-r from-blue-300 to-pink-300 flex items-center justify-center min-h-screen">
      <div className="bg-blue-600/20 p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 flex items-center justify-center">
          Update Restaurant
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="restaurant_name"
            placeholder="Restaurant Name"
            value={formData.restaurant_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            disabled // optional (email usually not editable)
          />

          <div className="relative w-full">
                <input
                    type={showPassword ? "text" : "password"} // toggle type
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {/* Eye icon button */}
                <button
                    type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {showPassword ? "🔒" : "👁️"}
                </button>
            </div>

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Update Restaurant
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p>
            Back to{" "}
            <Link href="/restaurant" className="text-green-800 hover:underline">
              Dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
