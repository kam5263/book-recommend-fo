"use client";

import { Home } from "lucide-react"; // 또는 react-icons, heroicons 사용 가능
import Link from "next/link";

const FloatingHomeButton = () => {
  return (
    <Link href="/" className="fixed bottom-6 right-6 z-50">
      <div className="bg-white rounded-full shadow-lg p-3 border hover:bg-blue-50 transition-colors">
        <Home className="w-6 h-6 text-[color:#077A7D]" />
      </div>
    </Link>
  );
};

export default FloatingHomeButton;
