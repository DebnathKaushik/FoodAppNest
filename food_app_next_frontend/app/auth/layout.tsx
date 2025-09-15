// app/auth/layout.tsx
import Link from "next/link";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div >
      {/*Logo only on auth pages */}
      <Link href={"/"}>
        <div className="absolute top-4 left-4">
          <Image
            src="/logo k.jpg"
            alt="food logo"
            width={60}
            height={40}
            className="rounded-lg shadow-lg mx-auto"
          />
        </div>
      </Link>

      {/* Render the page (login/signup) */}
      {children}
    </div>
  );
}
