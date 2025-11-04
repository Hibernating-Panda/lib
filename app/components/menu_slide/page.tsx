import { Home, Search, Library } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MenuBar() {
  return (
    <div className="bg-white min-h-screen p-8 shadow-sm">
      {/* Logo/Title */}
      <Image src="/logo.png" alt="Logo" width={200} height={200} />

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-8">
        <Link 
          href="/home" 
          className="flex items-center gap-3 text-gray-800 hover:text-gray-600 transition-colors"
        >
          <Home className="w-6 h-6" />
          <span className="text-xl font-sans font-normal">Home</span>
        </Link>
        
        <Link 
          href="/search" 
          className="flex items-center gap-3 text-gray-800 hover:text-orange-500 transition-colors"
        >
          <Search className="w-6 h-6" />
          <span className="text-xl font-sans font-normal">Search</span>
        </Link>
        
        <Link 
          href="/shelf" 
          className="flex items-center gap-3 text-gray-800 hover:text-orange-500 transition-colors"
        >
          <Library className="w-6 h-6" />
          <span className="text-xl font-sans font-normal">My Shelf</span>
        </Link>
      </nav>
    </div>
  );
}
