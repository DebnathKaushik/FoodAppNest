
import Layout from "@/components/layout";
import Link from "next/link";

export default function Contact() {
  return (

    <Layout>
        <div className="min-h-screen bg-gradient-to-r from-yellow-100 to-orange-200 flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold text-orange-700 mb-6">Contact Us</h1>
        <p className="text-lg text-gray-800 mb-6 text-center max-w-xl">
            Have questions or want to connect with us? Reach out through the details
            below.
        </p>

        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md space-y-4 text-center">
            <p className="text-lg">
            <span className="font-semibold">Phone:</span> 01955965845
            </p>
            <p>
            <Link
                href="https://www.facebook.com/kaushik.debnath.58958"
                target="_blank"
                className="text-blue-600 hover:underline"
            >
                Facebook
            </Link>
            </p>
            <p>
            <Link
                href="https://github.com/DebnathKaushik"
                target="_blank"
                className="text-gray-800 hover:underline"
            >
                GitHub
            </Link>
            </p>
            <p>
            <Link
                href="https://www.linkedin.com/in/kaushik-debnath-668317354/"
                target="_blank"
                className="text-blue-700 hover:underline"
            >
                LinkedIn
            </Link>
            </p>
        </div>
        </div>
    </Layout>
  );
}

