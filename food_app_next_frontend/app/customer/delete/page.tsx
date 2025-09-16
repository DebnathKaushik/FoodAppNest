"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function DeleteCustomerPage() {
  const router = useRouter();
  const [customerId, setCustomerId] = useState<number | null>(null);

  // Fetch current customer info
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await axios.get("http://localhost:7000/Customer/auth/me", {
          withCredentials: true,
        });
        setCustomerId(res.data.id);
      } catch (err) {
        console.error(err);
        router.push("/auth/customer-login"); // redirect if not logged in
      }
    };
    fetchCustomer();
  }, []);

  const handleDelete = async () => {
    if (!customerId) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Your account will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`http://localhost:7000/Customer/delete/${customerId}`, {
          withCredentials: true,
        });

        await axios.post("http://localhost:7000/Customer/auth/logout", {}, {
          withCredentials: true,
        });

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your account has been deleted.",
        });

        router.push("/auth/customer-login");
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while deleting your account.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 p-6">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl text-center">
         <h2 className="text-2xl font-bold mb-4 text-red-600">Delete Account</h2>
         <p className="mb-6 text-gray-700">Once you delete your account, all your data will be permanently removed.</p>

            <div className="flex jusity-content gap-35 w-full">
                 <button
                    onClick={handleDelete}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                    Delete Account
                    </button>

                    <button
                    onClick={() => router.push("/customer")}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                    >
                    Cancel
                    </button>
            </div>
           
      </div>
    </div>
  );
}
