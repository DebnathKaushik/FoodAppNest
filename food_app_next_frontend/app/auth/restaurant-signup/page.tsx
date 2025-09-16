"use client";
import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

//Zod schema
const registerSchema = z.object({
  restaurant_name: z
    .string()
    .min(3, "Restaurant name must be at least 3 characters")
    .max(50, "Restaurant name must be less than 50 characters"),
  email: z.string().nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .max(15, "Phone number must be less than 15 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
});



export default function RestaurantSignup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    restaurant_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
  });

   // show and hide password 
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // it blocks defaults Submit (Reload that page) so below code can fetch or call backend and do stuff
  try {
    // Validate form data first
    registerSchema.parse(formData);

    // Send to backend
    const res = await axios.post("http://localhost:7000/Restaurant/sign-up", formData);

    // Show SweetAlert and wait for to close it
    await Swal.fire({
            icon: "success",
            title: "Registration Successful!",
            text: "You can now log in",
            confirmButtonText: "OK",
      });

    // redirect after the user closes the popup
    router.push("/auth/restaurant-login");
    
  } catch (err: any) {
  if (err instanceof z.ZodError) {
    // Map each issue to its message
    const messages = err.issues.map((issue) => issue.message).join("</br>");

    Swal.fire({
       title: "Validation Error",
      html: messages,  
      icon: "error",
    })
  } else {
    console.error("Something went wrong:", err);
    Swal.fire({
      title: "Error",
      text: "Something went wrong. Please try again.",
      icon: "error",
    })
  }
}

};


  return (
    
    <div className="bg-gradient-to-r from-blue-300 to-pink-300 flex items-center justify-center min-h-screen">
      <div className="bg-blue-600/20 p-6 rounded-2xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 flex items-center justify-center">Start Business/ Sign up</h2>

        <form onSubmit={handleSubmit} className="space-y-4 ">
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
            type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Register
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
            <p>
              Already have an account{" "}
              <Link href="/auth/restaurant-login" className="text-green-800 hover:underline">
                Login
              </Link>
            </p>
          </div>
      </div>
    </div>
    );
  
}
