import Link from "next/link";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "@/hooks/useMutation";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
const LayoutComponent = dynamic(() => import("@/layouts"));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate } = useMutation();
  const router = useRouter();
  const handleLogin = async () => {
    const formLogin = { email, password };
    const res = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/login",
      payload: formLogin,
    });
    if (res?.success) {
      Swal.fire({
        icon: "success",
        title: "Login successful!",
      });
      Cookies.set("user_token", res?.data?.token, {
        expires: new Date(res?.data?.expires_at),
        path: "/",
      });
      router.push("/");
    } else {
      Swal.fire({
        icon: "error",
        title: "Login failed. Please try again.",
      });
    }
  };
  return (
    <LayoutComponent
      metaTitle="Login"
      metaDescription="ini adalah halaman Login Page"
      metaKeyword="Login, DialogueTalk"
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <h1 className=" font-extrabold text-xl mx-auto">DialogueTalk</h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Password</span>
                <span className="label-text-alt font-semibold cursor-pointer  text-red-800 hover:text-red-800">
                  Forgot Password?
                </span>
              </div>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center btn btn-primary text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleLogin}
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-2 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              href={"/register"}
              className="font-semibold leading-6 text-red-800 hover:text-red-800"
            >
              Start a 14 day free trial
            </Link>
          </p>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Login;
