import Layout from "@/components/layout"


export default function About() {
  return (

    <Layout>

        <div className="min-h-screen bg-gradient-to-r from-green-200 to-blue-200 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">About FoodApp</h1>
        <p className="max-w-3xl text-lg text-gray-800 leading-relaxed text-center">
            FoodApp is a modern web application that connects customers with
            restaurants to make food ordering simple and efficient. Customers can
            explore restaurant menus, place orders, and enjoy fast delivery. On the
            other side, restaurants can manage their products and serve customers
            effectively.
        </p>

        <h2 className="text-2xl font-semibold text-blue-800 mt-8 mb-4">
            Technologies Used
        </h2>
        <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>NestJS (Backend API)</li>
            <li>Next.js (Frontend with SSR)</li>
            <li>Tailwind CSS (Styling)</li>
            <li>PostgreSQL (Database)</li>
            <li>Postman (API Testing)</li>
            <li>JWT Authentication & Custom Validation</li>
            <li>Pusher (Real-time updates)</li>
            <li>Zod Validation</li>
        </ul>
        </div>

    </Layout>

  );
}

