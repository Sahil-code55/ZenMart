import React from 'react'
import { Link } from 'react-router-dom';
import Logo from "../components/Logo";
import { useAuth } from '../context/AuthContext';

const Navbar = () => {

const { user } = useAuth();
const userName = user?.name || "Guest";
const userInitial = userName.charAt(0).toUpperCase();

  return (
    <nav className="border-b border-[#1E3028] bg-[#0D1512]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <Logo className="w-32" />

          <div className="flex items-center gap-3">
            <Link
              to="/products/add"
              className="rounded-xl border  border-[#059669] bg-[#0596682b] text-white px-4 py-2.5 text-sm font-semibold text- transition hover:bg-[#0596684d] hover:scale-x-98 active:scale-95"
            >
              + Add Product
            </Link>
          
          <div className=" h-12 rounded-xl border border-[#292c36] bg-[#111217] px-3">
          <div className="flex items-center justify-center gap-3 h-full ">

         <div className="w-10  border border-[#292c36] bg-[#059669] rounded-xl flex items-center justify-center text-xl h-9">{userInitial}</div>   
    
         <div>
        <h1 className="text-sm font-semibold text-gray-100">
        {userName}
        </h1>

      <p className="text-[11px] text-gray-400">
        Buyer's Account
      </p>
      </div>

      </div>
      </div>

          </div>

        </div>
      </nav>
  )
}

export default Navbar
