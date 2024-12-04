// src/app/navbar.tsx
import React from 'react';
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.replace('/login');
  };

  return (
    <nav className="fixed left-0 top-0 w-48 h-full bg-gray-200 p-4">
      <ul className="space-y-4">
        <li><a href="/dashboard" className="text-gray-800 hover:text-blue-500">Dashboard</a></li>
        <li><a href="/product" className="text-gray-800 hover:text-blue-500">Sản phẩm</a></li>
        <li><a href="/order" className="text-gray-800 hover:text-blue-500">Đơn hàng</a></li>
        <li><button 
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Đăng xuất
        </button></li>
      </ul>
    </nav>
  );
};

export default Navbar;