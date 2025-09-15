import Link from 'next/link'
import React from 'react'

export default function RestaurantLogin() {
  return (
    <div>
        <div className="mt-6 text-center space-y-2">
          <p>
            Create an account{" "}
            <Link href="/auth/restaurant-signup" className="text-blue-600 hover:underline">
              signup
            </Link>
          </p>
        </div>
    </div>
  )
}
