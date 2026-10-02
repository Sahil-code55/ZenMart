import { useState } from "react";
import { Navigate } from "react-router-dom";
import Login from "../Auth/Login.jsx";
import Register from "../Auth/Register.jsx";
import Logo from "../components/Logo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070A09]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#1E3028] border-t-[#34D399]" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/products" replace />;
  }

  return (
    <div className="min-h-screen bg-[#070A09] px-4 py-4 text-white sm:px-6 lg:px-8">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#059669]/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#34D399]/10 blur-[120px]" />
      </div>

      {/* Main container */}
      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-[1250px] items-stretch overflow-hidden rounded-[28px] border border-[#1D2B26] bg-[#0D1110] shadow-2xl shadow-black/50">

        {/* =====================================================
            LEFT — STATIC ZENMART VISUAL
        ====================================================== */}
        <section className="relative hidden w-[54%] overflow-hidden border-r border-[#1B2924] bg-[#0A0E0D] lg:block">

          {/* Green glow */}
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#059669]/10 blur-[100px]" />

          <div className="absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-[#34D399]/5 blur-[100px]" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#34D399 1px, transparent 1px), linear-gradient(90deg, #34D399 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          <div className="relative flex h-full flex-col justify-center px-8 py-7 xl:px-12">

            {/* Heading */}
            <div className="mb-5 max-w-lg">

              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#34D399] shadow-[0_0_12px_#34D399]" />

                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E7C75]">
                  ZenMart commerce
                </span>
              </div>

              <h2 className="text-3xl font-bold leading-[1.05] tracking-tight text-white xl:text-4xl">
                Everything you need.
                <span className="block text-[#34D399]">
                  One place.
                </span>
              </h2>

              <p className="mt-3 max-w-md text-xs leading-5 text-[#75827C]">
                Discover products, manage your orders and enjoy a cleaner
                shopping experience built around you.
              </p>

            </div>

            {/* Shopping card */}
            <div className="relative rounded-2xl border border-[#20312A] bg-[#101513]/90 p-3.5 shadow-2xl shadow-black/40 backdrop-blur-xl">

              <div className="mb-3 flex items-center justify-between">

                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-[#64716B]">
                    Your shopping activity
                  </p>

                  <p className="mt-0.5 text-base font-semibold text-white">
                    Latest picks
                  </p>
                </div>

                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#254037] bg-[#10221B]">
                  <svg
                    className="h-4 w-4 text-[#34D399]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 2.5c-.6.8 0 1.9 1 1.9h11M9 21h.01M19 21h.01"
                    />
                  </svg>
                </div>

              </div>

              {/* Products */}
              <div className="grid grid-cols-3 gap-2.5">

                <div className="rounded-xl border border-[#202D28] bg-[#0C1210] p-2.5">
                  <div className="flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-[#12382B] to-[#0C1713]">
                    <div className="h-10 w-10 rounded-xl border border-[#34D399]/30 bg-[#34D399]/10" />
                  </div>

                  <div className="mt-2">
                    <p className="text-[11px] font-medium text-[#DCE4E0]">
                      Daily Essentials
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#61706A]">
                      From ₹299
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-[#202D28] bg-[#0C1210] p-2.5">
                  <div className="flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-[#20352D] to-[#101713]">
                    <div className="h-10 w-10 rounded-full border border-[#6EE7B7]/30 bg-[#6EE7B7]/10" />
                  </div>

                  <div className="mt-2">
                    <p className="text-[11px] font-medium text-[#DCE4E0]">
                      Lifestyle
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#61706A]">
                      From ₹499
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-[#202D28] bg-[#0C1210] p-2.5">
                  <div className="flex h-20 items-center justify-center rounded-lg bg-gradient-to-br from-[#15352B] to-[#0D1512]">
                    <div className="h-9 w-14 rounded-lg border border-[#34D399]/30 bg-[#34D399]/10" />
                  </div>

                  <div className="mt-2">
                    <p className="text-[11px] font-medium text-[#DCE4E0]">
                      Tech Picks
                    </p>
                    <p className="mt-0.5 text-[10px] text-[#61706A]">
                      From ₹799
                    </p>
                  </div>
                </div>

              </div>

              {/* Bottom activity */}
              <div className="mt-3 flex items-center justify-between rounded-xl border border-[#1C2A25] bg-[#0C1210] px-3 py-2.5">

                <div className="flex items-center gap-2.5">

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#059669]/10">
                    <span className="h-2 w-2 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399]" />
                  </div>

                  <div>
                    <p className="text-[11px] font-medium text-[#D7E0DC]">
                      Shopping experience
                    </p>

                    <p className="text-[9px] text-[#5F6C66]">
                      Fast · Secure · Simple
                    </p>
                  </div>

                </div>

                <span className="text-[11px] font-semibold text-[#34D399]">
                  Ready
                </span>

              </div>

            </div>

            {/* Features */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">

              <div className="rounded-xl border border-[#192721] bg-[#0C1210]/80 p-2.5">
                <p className="text-base font-bold text-white">01</p>
                <p className="mt-0.5 text-[9px] text-[#65736D]">
                  Easy shopping
                </p>
              </div>

              <div className="rounded-xl border border-[#192721] bg-[#0C1210]/80 p-2.5">
                <p className="text-base font-bold text-white">02</p>
                <p className="mt-0.5 text-[9px] text-[#65736D]">
                  Secure checkout
                </p>
              </div>

              <div className="rounded-xl border border-[#192721] bg-[#0C1210]/80 p-2.5">
                <p className="text-base font-bold text-white">03</p>
                <p className="mt-0.5 text-[9px] text-[#65736D]">
                  Track orders
                </p>
              </div>

            </div>

          </div>
        </section>

        {/* =====================================================
            RIGHT — LOGIN / REGISTER
        ====================================================== */}
        <section className="relative z-10 flex w-full items-center justify-center px-6 py-7 sm:px-10 lg:w-[46%] lg:px-12 xl:px-14">

          {isRegister ? (
            <Register
              onSwitch={() => setIsRegister(false)}
            />
          ) : (
            <Login
              onSwitch={() => setIsRegister(true)}
            />
          )}

        </section>

      </div>
    </div>
  );
}

export default Auth;