"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CustomerLogoutButton from "@/components/customer/customerLogoutButton";

export default function CustomerDashboard() {
  const [customer, setCustomer] = useState<{id:number, email:string, name: string} | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:7000/Customer/auth/me", {withCredentials: true}); // send HttpOnly cookie
        setCustomer(res.data);
      } catch (err) {
        console.error("Failed to fetch Customer:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="p-8">
      <h1>Customer Dashboard</h1>
      {customer ? (
        <div>
            <p>Customer Name: {customer.name}</p>
            <p>Customer Email: {customer.email}</p>
            <CustomerLogoutButton/>
        </div>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}
