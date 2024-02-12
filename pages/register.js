import React, { useState } from "react";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";
import { format } from "date-fns";
import { useMutation } from "@/hooks/useMutation";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const LayoutComponent = dynamic(() => import("@/layouts"));

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hobby, setHobby] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(new Date());
  const { mutate, data, isLoading } = useMutation();

  const router = useRouter();

  const handleRegister = async () => {
    const formLogin = {
      name,
      email,
      password,
      hobby,
      phone,
      dob: format(dob, "yyyy-MM-dd"),
    };
    // console.log("DATA=>", formLogin);
    const res = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/register",
      payload: formLogin,
    });
    console.log("ISLOADING", isLoading);
    if (res?.success) {
      Swal.fire({
        icon: "success",
        title: "Registration successful!",
      });
      console.log("ISLOADING", isLoading);
      router.push("/login");
    } else {
      Swal.fire({
        icon: "error",
        title: "Please fill in all the fields to register.",
      });
    }
    console.log("ISLOADING", isLoading);
  };

  return (
    <LayoutComponent
      metaTitle="Register"
      metaDescription="ini adalah halaman Register Page"
      metaKeyword="Register, DialogueTalk"
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <h1 className=" font-extrabold text-xl mx-auto">DialogueTalk</h1>
        </div>

        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <div className=" space-y-1">
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Username</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Date</span>
              </div>
              <DatePicker
                selected={dob}
                onChange={(date) => setDob(date)}
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Phone</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Hobby</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full "
                value={hobby}
                onChange={(e) => setHobby(e.target.value)}
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <button
            className="btn btn-primary w-full mt-4"
            onClick={handleRegister}
          >
            Register
          </button>
          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href={"/login"}
              className=" text-red-800 font-bold cursor-pointer"
            >
              Login Here
            </Link>{" "}
          </p>
        </div>
      </div>
    </LayoutComponent>
  );
};

export default Register;
