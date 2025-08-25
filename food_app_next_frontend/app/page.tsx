import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <h1>Hello</h1>
    <h5>Main page</h5>

    <Link href="about">About page</Link>
    <Image src="/bus.avif" alt="Bus" width={400} height={100}></Image>
    </>
    
  );
}
