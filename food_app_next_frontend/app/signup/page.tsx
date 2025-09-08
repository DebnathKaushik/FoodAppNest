"use client";
import { useState } from "react";
import axios from "axios";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

//Zod schema
const registerSchema = z.object({
  restaurant_name: z
    .string()
    .min(3, "Restaurant name must be at least 3 characters")
    .max(50, "Restaurant name must be less than 50 characters"),
  email: z.string().email("Invalid email address" ),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^\+?\d+$/, "Phone number must contain only numbers and optional '+'"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
});





export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    restaurant_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    city: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    // Validate form first
    registerSchema.parse(formData);

    // Send to backend
    const res = await axios.post("http://localhost:7000/Restaurant/sign-up", formData);
    router.push("/login");
    console.log("Registration successful!", res.data);
  } catch (err: any) {
  if (err instanceof z.ZodError) {
    // Map each issue to its message
    const messages = err.issues.map((issue) => issue.message);
    alert(messages.join("\n"));
  } else {
    console.error("Something went wrong:", err);
    alert("Something went wrong. Please try again.");
  }
}

};


  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>

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
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>

      <div className="mt-6 text-center space-y-2">
          <p>
            Already have an account{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
    </div>
  );
}
