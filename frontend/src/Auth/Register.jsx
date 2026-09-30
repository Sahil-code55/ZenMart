import { useForm } from "react-hook-form";

import Logo from "../components/Logo.jsx";
import { useAuth } from "../context/AuthContext";

function Register({ onSwitch }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    mode: "onBlur",
  });

   const { register: registerUser } = useAuth();

  const password = watch("password");

  const onSubmit = async (data) => {
    try {

      // const { confirmPassword, ...registerData } = data;
      await registerUser(data);
      reset();
      // Switch back to login after successful registration
      onSwitch();

    } 
    catch (error) {
      setError("root", {
        message:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="w-full max-w-md">

      {/* Logo */}
      <div className="mb-5">
        <Logo className="w-32" />
      </div>

      {/* Heading */}
      <div className="mb-5">
        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-[#1E3028] bg-[#101815] px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />

          <span className="text-[10px] font-medium text-[#8E9A94]">
            Join ZenMart
          </span>
        </div>

        <h2 className="text-[28px] font-bold tracking-[-0.03em] text-white">
          Create your account
        </h2>

        <p className="mt-1.5 text-xs text-[#75817B]">
          Start your ZenMart shopping experience.
        </p>
      </div>

      {/* Register Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3"
      >

        {/* Name */}
        <FormField
          label="Full name"
          id="name"
          type="text"
          placeholder="Your name"
          error={errors.name}
          register={register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must contain at least 2 characters",
            },
          })}
        />

        {/* Email */}
        <FormField
          label="Email address"
          id="register-email"
          type="email"
          placeholder="you@example.com"
          error={errors.email}
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address",
            },
          })}
        />

        {/* Password */}
        <FormField
          label="Password"
          id="register-password"
          type="password"
          placeholder="Create a password"
          error={errors.password}
          register={register("password", {
            required: "Password is required",
            minLength: {
            value: 8,
            message: "Password must contain at least 8 characters",
           }
          })}
        />

        {/* Confirm Password */}
        <FormField
          label="Confirm password"
          id="confirm-password"
          type="password"
          placeholder="Enter password again"
          error={errors.confirmPassword}
          register={register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
        />

        {/* Server Error */}
        {errors.root && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2">
            <p className="text-[11px] text-red-400">
              {errors.root.message}
            </p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group w-full rounded-xl bg-[#059669] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-[#059669]/10 transition-all hover:bg-[#10B981] hover:shadow-[#059669]/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span className="flex items-center justify-center gap-2">
            {isSubmitting
              ? "Creating account..."
              : "Create account"}

            {!isSubmitting && (
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            )}
          </span>
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-4 border-t border-[#1B2924] pt-4 text-center">
        <p className="text-xs text-[#77837E]">
          Already have an account?{" "}

          <button
            type="button"
            onClick={onSwitch}
            className="font-semibold text-[#34D399] transition hover:text-[#6EE7B7]"
          >
            Sign in
          </button>
        </p>
      </div>

    </div>
  );
}


/* =========================================================
   Reusable Form Field
========================================================= */

function FormField({
  label,
  id,
  type,
  placeholder,
  error,
  register,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-medium text-[#DDE5E1]"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        className={`w-full rounded-xl border bg-[#080D0B] px-4 py-2.5 text-sm text-white placeholder:text-[#53605A] outline-none transition-all ${
          error
            ? "border-red-500/60 focus:ring-2 focus:ring-red-500/10"
            : "border-[#1E2C26] focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/10"
        }`}
      />

      {error && (
        <p className="mt-1 text-[10px] text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default Register;