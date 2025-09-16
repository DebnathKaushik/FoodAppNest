"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { z } from "zod";

//  Zod schema for validation
const loginSchema = z.object({
  email: z.string().nonempty("Email is required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
});

export default function RestaurantLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // show and hide password 
  const [showPassword, setShowPassword] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // Validate with Zod
    loginSchema.parse(formData);

    // Send request to backend
    const res = await axios.post("http://localhost:7000/Restaurant/auth/login",formData,{ withCredentials: true }
    );

    // Show success alert and redirect to dashboard after click OK
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        confirmButtonText: "OK",
      }).then(() => {
        router.push("/restaurant"); // go to restaurant dashboard page
      });
    } catch (err: any) {
    if (err instanceof z.ZodError) {
      const messages = err.issues.map((i) => i.message).join("<br/>");
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        html: messages,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Something went wrong",
      });
    }
  }
};


  return (
    <div className="bg-gradient-to-r from-blue-300 to-pink-300 flex items-center justify-center min-h-screen">
      <div className="bg-blue-600/20 p-6 rounded-2xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Restaurant Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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


          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Create an account{" "}
            <Link
              href="/auth/restaurant-signup"
              className="text-blue-600 hover:underline"
            >
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
