import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
     
     <Link href="/login" >
          Get Started
      </Link>

      <h1 className="text-4xl">Food App</h1>
        
      <Link href="/about" className="mb-6 ">
        About Page
      </Link>

      <Image
        src="/foodimage.avif"
        alt="food image"
        width={800}
        height={400}
        className="rounded-lg shadow-lg"
      />
    </>
  );
}
