"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { number, z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

//Zod schema
const ProductSchema = z.object({
  product_name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(50, "Product name must be less than 50 characters"),

  price: z.number("Price is required and Number"),

  description: z
    .string()
    .min(3, "description name must be at least 3 characters")
    .max(300, "Restaurant name must be less than 300 characters"),

  restaurantId:z.number("restaurantId is required")
});



export default function CreateProduct() {
  const router = useRouter();

  // form data set here
  const [formData, setFormData] = useState({
    product_name: "",
    price: "",        // initialize first
    description: "",
    restaurantId: 0, // initialize first
  });


  // For Restaurant id auto fill up in create product page , so in input field dont use restaurant id 
  useEffect(() => {
  const fetchRestaurant = async () => {
    try {
      const res = await axios.get("http://localhost:7000/Restaurant/auth/me", {
        withCredentials: true,
      });
      // Set restaurantId in formData dynamically
      setFormData((prev) => ({ ...prev, restaurantId: res.data.id }));
    } catch (err) {
      console.error("Failed to fetch restaurant info:", err);
    }
  };
  fetchRestaurant();
}, []);




  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // it blocks defaults Submit (Reload that page) so below code can fetch or call backend and do stuff
  try {

    // convert Price and restaurant id into --> Number
    const submissionData = {
      ...formData,
      price: Number(formData.price),
      restaurantId: Number(formData.restaurantId)
    };

    // Validate form data first
    ProductSchema.parse(submissionData);

    // Send to backend
    const res = await axios.post("http://localhost:7000/Restaurant/create-product", submissionData,{
        withCredentials:true,
    });
    setFormData((prev) => ({ ...prev, restaurantId: res.data.id }));

    // Show SweetAlert and wait for to close it
    await Swal.fire({
            icon: "success",
            title: "Product Create Successful!",
            text: "You can see product",
            confirmButtonText: "OK",
      });

    // redirect after the user closes the popup
    router.push("/restaurant");
    
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
        <h2 className="text-xl font-bold mb-4 flex items-center justify-center">Create Food Item</h2>

        <form onSubmit={handleSubmit} className="space-y-4 ">
          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="price"
            placeholder="price"
            value={formData.price}
            // price is number so typecasting here
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

    
          <button
            type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Create Product
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
            <p>
              See My Products{" "}
              <Link href="/restaurant" className="text-green-800 hover:underline">
                Dashboard
              </Link>
            </p>
          </div>

      </div>
    </div>
    );
  
}
