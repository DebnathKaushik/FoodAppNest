"use client";
import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

// Zod schema for customer registration
const customerSchema = z.object({
  customer_name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z
    .string()
    .nonempty("Email is required"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
  phone: z
    .string("phone number must have startWith '01' and 11 digits")
    .min(11, "Phone number must be at least 11 digits")
    .max(15, "Phone number must be less than 15 digits"),
  address: z
    .string()
    .min(5, "Address must be at least 5 characters"),
});

export default function CustomerSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

   // show and hide password 
  const [showPassword, setShowPassword] = useState(false);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form here
      customerSchema.parse(formData);

      // send data to backend
      const res = await axios.post("http://localhost:7000/Customer/sign-up",formData);

      // Show SweetAlert and wait for to close it
      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You can now log in",
        confirmButtonText: "OK",
      });

      // redirect after the user closes the popup
      router.push("/auth/customer-login"); 

    } catch (err: any) {
      if (err instanceof z.ZodError) {
        const messages = err.issues.map((issue) => issue.message).join("<br/>");
        Swal.fire({
          icon: "error",
          title: "Validation Error",
          html: messages,
        });
      } else if (err.response) {
        // Backend error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong",
        });
      } else {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 to-green-300 flex items-center justify-center min-h-screen">
      <div className="bg-white/30 p-8 rounded-3xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Be a Happy Customer/ Sign up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="customer_name"
            placeholder="Name"
            value={formData.customer_name}
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
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          Already have an account?{" "}
          <Link href="/auth/customer-login" className="text-green-700 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

