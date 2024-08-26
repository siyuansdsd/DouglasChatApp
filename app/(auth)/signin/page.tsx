"use client"; // 确保这是一个客户端组件

import Link from "next/link";
import { useRouter } from "next/navigation"; // 从 next/navigation 导入
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function SignIn() {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter(); // 使用 useRouter 钩子
  const user =
    typeof window !== "undefined" ? sessionStorage.getItem("user") : null;

  useEffect(() => {
    const savedName = user;
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      typeof window !== "undefined" && sessionStorage.setItem("user", name);
      router.push("/chat");
    } catch (error) {
      setErrorMessage("Login failed.");
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome back</h1>
          </div>

          <div className="max-w-sm mx-auto">
            <form onSubmit={handleLogin}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block text-gray-800 text-sm font-medium mb-1"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-input w-full text-gray-800"
                    placeholder="Enter your user name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                    type="submit"
                  >
                    Sign in
                  </button>
                </div>
              </div>
              {errorMessage && (
                <div className="text-red-600 text-center mt-4">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
