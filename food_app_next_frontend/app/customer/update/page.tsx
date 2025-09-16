"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const UpdateCustomerSchema = z.object({
  id: z.number(),
  customer_name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string("Email address Required"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  phone: z.string().min(11, "Phone must be at least 10 digits"),
  address: z.string().min(3, "Address must be at least 3 characters"),
});

export default function CustomerUpdate() {
  const router = useRouter();
  // show and hide password 
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    id: 0,
    customer_name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

 useEffect(() => {
  const fetchCustomer = async () => {
    try {
      const res = await axios.get("http://localhost:7000/Customer/auth/me", {
        withCredentials: true,
      });

      setFormData({
        id: res.data.id ?? 0,
        customer_name: res.data.customer_name ?? "",
        email: res.data.email ?? "",
        phone: res.data.phone ?? "",
        address: res.data.address ?? "",
        password: "", // always blank
      });

    } catch (err) {
      console.error(err);
    }
  };
  fetchCustomer();
}, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleUpdate = async () => {
  try {
    UpdateCustomerSchema.parse(formData);
    const { id, ...updateData } = formData;

    const res = await axios.patch(
      `http://localhost:7000/Customer/update/${id}`,
      updateData,
      { withCredentials: true }
    );

    // Update frontend immediately
    setFormData({
      id: res.data.customer.id,
      customer_name: res.data.customer.customer_name,
      email: res.data.customer.email,
      phone: res.data.customer.phone,
      address: res.data.customer.address,
      password: "",
    });

    await Swal.fire({
      icon: "success",
      title: "Profile Updated",
      text: "Your information has been updated successfully!",
    });

    router.push("/customer")

  } catch (err: any) {
    console.error(err);
    Swal.fire({ icon: "error", title: "Error", text: "Something went wrong" });
  }
};



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-200 to-blue-300 p-6">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

        <input
          type="text"
          name="customer_name"
          placeholder="Name"
          value={formData.customer_name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-2"
          disabled
        />
         <div className="relative w-full mb-2">
                <input
                    type={showPassword ? "text" : "password"} // toggle type
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
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
          className="w-full border p-2 rounded mb-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <div className="flex justify-between">
                <div className="flex justify-between">
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Update
              </button>
            </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => router.push("/customer")}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Close
                </button>
            </div>
        </div>


      </div>
    </div>
  );
}
