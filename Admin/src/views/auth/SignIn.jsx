import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [dairyCode, setDairyCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, getuserID } = useAuth();
  const navigate = useNavigate();

  const handleDairyCodeChange = (e) => {
    setDairyCode(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      if (!dairyCode || !password) {
        console.error("Please provide both DairyCode and Password.");
        return;
      }

      const response = await axios.post("/user-login", {
        dairyCode,
        password,
      });

      const { success, message, role, userId } = response.data;
      console.log(userId);

      if (success) {
        login(role, userId);
        setError("success");

        if (role === "manager") {
          navigate("/admin");
        } else {
          alert("Please Enter The manager DairyCode And Password");
          setError("error");
        }
      } else {
        console.error("Login failed:", message);
        setError("error");
      }
    } catch (error) {
      console.error("API request failed:", error);
      setError("error");
    }
  };

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your DairyCode and password to sign in!
        </p>
        <label
          className="${ mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm
            outline-none dark:!border-white/10 dark:text-white
          "
        >
          DairyCode:
        </label>
        <input
          type="text"
          placeholder="DairyCode*"
          value={dairyCode}
          onChange={handleDairyCodeChange}
          className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
            error === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : error === "success"
              ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
              : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`}
        />
        <label
          className="${ mt-2 flex h-12 w-full items-center justify-center rounded-xl border border-gray-200 bg-white/0 p-3 text-sm
          outline-none dark:!border-white/10 dark:text-white
          "
        >
          Password:
        </label>

        <input
          type="password"
          placeholder="Password*"
          value={password}
          onChange={handlePasswordChange}
          className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
            error === "error"
              ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
              : error === "success"
              ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
              : "border-gray-200 dark:!border-white/10 dark:text-white"
          }`}
        />

        <div className="justify between mb-4 flex items-center px-2">
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div>
        <button
          className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <span className="text-sm font-medium text-navy-700 dark:text-gray-600">
          Not registered yet?
        </span>
        <a
          href=" "
          className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
        >
          Create an account
        </a>
      </div>
    </div>
  );
}
