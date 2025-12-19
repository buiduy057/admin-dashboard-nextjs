"use client";
import React from 'react'
import {
  LogOut,
} from "lucide-react";
import { useMutation } from '@tanstack/react-query';
import { logout } from '@/services/user.service';
import { useRouter } from 'next/navigation';
const Header = () => {
  const router = useRouter();
   const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push("/login");
    },
  });
  const handleLogout = () => {
    mutate();
  };
  return (
    <header className="h-16 bg-white border-b px-6 flex justify-between items-center">
      <span className="font-semibold text-primary">Dashboard</span>
      <button
        className="text-sm flex items-center gap-1 cursor-pointer"
        onClick={()=> handleLogout()}
      >
        <LogOut/>
        Logout
      </button>
    </header>
  )
}

export default Header