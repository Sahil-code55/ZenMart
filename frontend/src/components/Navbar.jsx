import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../components/Logo";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userName = user?.name || "Guest";
  const userInitial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };

    if (isAccountOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isAccountOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      setIsAccountOpen(false);
      toast.success("Logged out successfully.");
      navigate("/auth");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <nav className="border-b border-[#1E3028] bg-[#0D1512]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

        {/* Logo */}
        <Logo className="w-32" />

        <div className="flex items-center gap-3">

          {/* Add Product */}
          <Link
            to="/products/add"
            className="rounded-xl border border-[#059669] bg-[#0596682b] px-4 py-2.5 text-sm font-semibold text-white transition hover:scale-[0.98] hover:bg-[#0596684d] active:scale-95"
          >
            + Add Product
          </Link>

          {/* Account Wrapper */}
          <div className="relative" ref={dropdownRef}>

            {/* Account Button */}
            <button
              type="button"
              onClick={() => setIsAccountOpen((prev) => !prev)}
              className="h-12 rounded-xl border border-[#292c36] bg-[#111217] px-3 transition hover:border-[#3a3f4b]"
            >
              <div className="flex h-full items-center justify-center gap-3">

                {/* Avatar */}
                <div className="flex h-9 w-10 items-center justify-center rounded-xl border border-[#292c36] bg-[#059669] text-xl text-white">
                  {userInitial}
                </div>

                {/* User Info */}
                <div className="text-left">
                  <h1 className="text-sm font-semibold text-gray-100">
                    {userName}
                  </h1>

                  <p className="text-[11px] text-gray-400">
                    Buyer's Account
                  </p>
                </div>

                {/* Chevron */}
                <span
                  className={`text-xs text-gray-400 transition-transform duration-200 ${
                    isAccountOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </div>
            </button>

            {/* Dropdown */}
            {isAccountOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-52 overflow-hidden rounded-xl border border-[#292c36] bg-[#111217] shadow-xl shadow-black/30">

                {/* Account Info */}
                <div className="border-b border-[#292c36] px-4 py-3">
                  <p className="text-sm font-semibold text-white">
                    {userName}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {user?.email || "No email"}
                  </p>
                </div>

            {/* Logout */}
            <button
            type="button"
            onClick={() => setIsLogoutOpen(true)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-[#F87171] transition hover:bg-[#211111]"
            >
            <span>↪</span>
            Logout
            </button>
            </div>
            )}

          </div>
        </div>
      </div>
      {/* Logout Confirmation Modal */}
      {isLogoutOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-5 backdrop-blur-sm">
    <div className="w-full max-w-sm rounded-2xl border border-[#1E3028] bg-[#111217] p-6 shadow-2xl shadow-black/40">

      {/* Icon */}
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#211111] text-lg text-[#F87171]">
        ↪
      </div>

      {/* Content */}
      <h2 className="text-lg font-semibold text-white">
        Logout?
      </h2>

      <p className="mt-2 text-sm leading-5 text-gray-400">
        Are you sure you want to logout from your account?
      </p>

      {/* Actions */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setIsLogoutOpen(false)}
          className="rounded-xl border border-[#292c36] bg-[#0D1512] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-[#3a3f4b] hover:text-white"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="rounded-xl bg-[#B91C1C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#DC2626]"
        >
          Yes, Logout
        </button>
      </div>

    </div>
  </div>
)}
    </nav>
  );
};

export default Navbar;