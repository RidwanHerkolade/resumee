import React, { useState } from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import supabase from "../../Helper/supabaseClient";
import { toast } from "sonner";
// import {ThreeDots} from "react-spinner"

const Login = () => {
  const icons = [
    { id: 1, icon: <FacebookRoundedIcon /> },
    { id: 2, icon: <TwitterIcon /> },
    { id: 3, icon: <GitHubIcon /> },
    { id: 4, icon: <GoogleIcon /> },
  ];
//   REACT HOOK FORM VALIDATION
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
// ONSUBMIT HANDLER
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const onSubmit = async ({ email, password }) => {
  setLoading(true);
  try {
    const { data: userData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.toLowerCase().includes("invalid login credentials")) {
        toast.error("Wrong email or password.");
      } else {
        toast.error(`Login failed: ${error.message}`);
      }
      return;
    }

    toast.success("Login successful!");
    console.log("Logged in user:", userData);
    navigate("/Resume");
  } catch (error) {
    toast.error("Unexpected error: " + error.message);
    console.error("Login error:", error);
  } finally {
    setLoading(false);
  }
};

// SIGN IN WITH GOOGLE
 const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/Resume`, // change to your desired route
      },
    });
    if (error) {
      console.error('Google sign-in error:', error.message);
      toast.error("google sign in error")
    } else {
      console.log('Redirecting to Google...')
    }
  };

  return (
    <div className="h-[100vh] px-4 sm:px-8 flex justify-center items-center flex-col">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Hey, Hello 👋</h2>
        <p className="text-gray-600">
          Enter the information you entered while registering !!
        </p>
      </div>

      <form
        className="w-full max-w-md flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            placeholder="Email"
            className="w-full px-4 py-2 border-2 border-blue-600 rounded-md text-base outline-none"
            type="email"
            {...register("email", {
              required: "Enter a valid email",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            placeholder="Password"
            className="w-full px-4 py-2 border-2 border-blue-600 rounded-md text-base outline-none"
            type="password"
            {...register("password", {
              required: "Enter your password",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
              maxLength: {
                value: 10,
                message: "Maximum 10 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center gap-2">
          <input
            id="terms"
            type="checkbox"
            {...register("acceptterms", {
              required: "Accept terms and conditions",
            })}
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            You accept our terms and conditions
          </label>
        </div>
        {errors.acceptterms && (
          <p className="text-red-500 text-sm">{errors.acceptterms.message}</p>
        )}
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <BeatLoader height="20" color="#fff" visible={true} />
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mt-4">
          {icons.map((data) => (
            <div
              key={data.id}
              className="bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
            >
              {data.icon}
            </div>
          ))}
        </div>
        <button
          type="button"
            onClick={handleGoogleLogin}
          className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 transition"
        >
          <GoogleIcon />
          Sign in with Google
        </button>
        {/* Link to Login */}
        <p className="text-center text-sm mt-4 text-gray-700">
          Don't have an account
          <Link
            to="/Register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
