import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Logo from "../components/Logo.jsx";
import { useAuth } from "../context/AuthContext.jsx";

function Login({ onSwitch }) {

  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data) => {

    try {
      
      await login(data);
      navigate("/products");

    } catch (error) {
      
      setError("root", {
        message:
          error.response?.data?.message ||
          "Login failed. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-md">

      {/* Logo */}
      <div className="mb-7">
        <Logo className="w-32 sm:w-36" />
      </div>

      {/* Heading */}
      <div className="mb-6">
        <div className="mb-3 inline-flex items-center rounded-full border border-[#1E3028] bg-[#101815] px-3 py-1">
          <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399]" />

          <span className="text-[11px] font-medium text-[#A7B3AE]">
            Welcome back
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Sign in to your
          <span className="block text-[#34D399]">
            ZenMart account.
          </span>
        </h1>

        <p className="mt-2 text-xs leading-5 text-[#89958F]">
          Access your account and continue shopping with a faster,
          simpler experience.
        </p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4"
      >

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-xs font-medium text-[#E5EAE8]"
          >
            Email address
          </label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Please enter a valid email address",
              },
            })}
            className={`w-full rounded-xl border bg-[#0A0F0D] px-4 py-3 text-sm text-white placeholder:text-[#68746F] outline-none transition-all duration-200 ${
              errors.email
                ? "border-red-500/60 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-[#1E2B26] focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
            }`}
          />

          {errors.email && (
            <p className="mt-1.5 text-[11px] text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-xs font-medium text-[#E5EAE8]"
            >
              Password
            </label>

            <button
              type="button"
              className="text-[11px] font-medium text-[#34D399] transition hover:text-[#6EE7B7]"
            >
              Forgot password?
            </button>
          </div>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            {...register("password", {
              required: "Password is required",
            })}
            className={`w-full rounded-xl border bg-[#0A0F0D] px-4 py-3 text-sm text-white placeholder:text-[#68746F] outline-none transition-all duration-200 ${
              errors.password
                ? "border-red-500/60 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-[#1E2B26] focus:border-[#059669] focus:ring-4 focus:ring-[#059669]/10"
            }`}
          />

          {errors.password && (
            <p className="mt-1.5 text-[11px] text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-[#33443D] bg-[#0A0F0D] accent-[#059669]"
          />

          <label
            htmlFor="remember"
            className="cursor-pointer text-xs text-[#8D9994]"
          >
            Remember me
          </label>
        </div>

        {/* Server error */}
        {errors.root && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5">
            <p className="text-xs text-red-400">
              {errors.root.message}
            </p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group relative w-full overflow-hidden rounded-xl bg-[#059669] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#059669]/10 transition-all duration-200 hover:bg-[#10B981] hover:shadow-xl hover:shadow-[#059669]/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isSubmitting ? "Signing in..." : "Sign in"}

            {!isSubmitting && (
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            )}
          </span>
        </button>
      </form>

      {/* Register switch */}
      <div className="mt-5 border-t border-[#1B2924] pt-4">
        <p className="text-center text-xs text-[#7F8A85]">
          Don't have an account?{" "}

          <button
            type="button"
            onClick={onSwitch}
            className="font-semibold text-[#34D399] transition hover:text-[#6EE7B7]"
          >
            Create account
          </button>
        </p>
      </div>

      {/* Footer */}
      <p className="mt-4 text-center text-[10px] text-[#56615D]">
        Secure authentication · ZenMart
      </p>

    </div>
  );
}

export default Login;