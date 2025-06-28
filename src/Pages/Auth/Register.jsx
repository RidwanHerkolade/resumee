import React, { useState } from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { toast, Toaster } from "sonner";
import { auth, googleProvider } from "../../../Firebase/config";
// import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
// import { auth, googleProvider } from "../../../firebase/config";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from "firebase/auth";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const icons = [
    { id: 1, icon: <FacebookRoundedIcon /> },
    { id: 2, icon: <TwitterIcon /> },
    { id: 3, icon: <GitHubIcon /> },
    { id: 4, icon: <GoogleIcon /> },
  ];

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async ({ fullName, email, password }) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });

      toast.success("Signup successful!");
      navigate("/Login");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Try logging in.");
      } else {
        toast.error("Signup failed: " + error.message);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Signed up with Google!");
      navigate("/Resume");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      toast.error("Google sign-in error");
    }
  };

  return (
    <>
      <Toaster />
      <div className="sm:h-full h-[100vh] md:h-[100vh] px-4 py-[2rem] sm:px-8 flex justify-center items-center flex-col overflow-y-scroll">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Hey, Hello</h2>
          <p className="text-gray-600">Create account to start using resumeee</p>
        </div>

        <form
          className="w-full max-w-md flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block font-medium mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              placeholder="Full name"
              className="w-full px-4 py-2 border-2 border-blue-600 rounded-md text-base outline-none"
              type="text"
              {...register("fullName", { required: "Enter your full name" })}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

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
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
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

          {/* Submit */}
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
              "Sign Up"
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

          {/* Google Sign-up */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-md flex items-center justify-center gap-2 transition"
          >
            <GoogleIcon />
            Sign up with Google
          </button>

          {/* Link to Login */}
          <p className="text-center text-sm mt-4 text-gray-700">
            Already have an account?{" "}
            <Link to="/Login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
