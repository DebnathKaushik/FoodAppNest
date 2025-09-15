import React from 'react'
import Link from "next/link";

export default function CustomerLogin() {
  return (
    <div> 
       Customer login

        <div>
            <div className="mt-6 text-center space-y-2">
            <p>
                Create an account{" "}
                <Link href="/auth/customer-signup" className="text-blue-600 hover:underline">
                signup
                </Link>
            </p>
            </div>
        </div>

    </div>
  )
}
