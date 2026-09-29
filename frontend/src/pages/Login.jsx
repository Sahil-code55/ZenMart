import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Logo from "../assets/ZenMart.jsx";

function Login() {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (data) => {

        console.log(response.data);

        try {
            const response = await api.post("/auth/login", data);

            const { accessToken } = response.data;

            localStorage.setItem("accessToken", accessToken);

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
        <div className="min-h-screen bg-[#F6FAF8] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="text-center mb-8">
                        <Logo className="w-44 mx-auto" />

                        <h1 className="text-3xl font-bold text-[#10231D] mt-6">
                            Welcome back
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Sign in to continue to ZenMart
                        </p>
                    </div>


                </div>

                {/* Login Card */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-7">

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                    >

                        {/* Email */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-[#1F2937] mb-2"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+\.\S+$/,
                                        message: "Please enter a valid email",
                                    },
                                })}
                                className={`w-full px-4 py-3 rounded-xl border outline-none transition
                  ${errors.email
                                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                                        : "border-gray-200 focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/10"
                                    }`}
                            />

                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-[#1F2937] mb-2"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                                className={`w-full px-4 py-3 rounded-xl border outline-none transition
                  ${errors.password
                                        ? "border-red-400 focus:ring-2 focus:ring-red-100"
                                        : "border-gray-200 focus:border-[#059669] focus:ring-2 focus:ring-[#059669]/10"
                                    }`}
                            />

                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Backend Error */}
                        {errors.root && (
                            <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                                {errors.root.message}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 rounded-xl bg-[#059669] text-white font-semibold
                         hover:bg-[#047857] transition
                         disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </button>

                    </form>

                    {/* Register */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-[#059669] hover:text-[#047857]"
                        >
                            Create account
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                    ZenMart • Secure authentication
                </p>

            </div>
        </div>
    );
}

export default Login;