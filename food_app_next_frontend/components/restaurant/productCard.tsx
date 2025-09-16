"use client";
import React from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  description: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ProductCard({id,name,price,description,onEdit,onDelete,}: ProductCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div>
            <div className="flex items-center justify-between w-full">
                <h2 className="text-lg font-bold">{name}</h2>
                <h2 className="text-lg font-bold text-gray-700">{id}</h2>
            </div>

        <p className="text-gray-600 mt-1">{description}</p>
        <p className="text-gray-800 font-semibold mt-2">${price}</p>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => onEdit(id)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
