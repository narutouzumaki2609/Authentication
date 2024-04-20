"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const initialData = {
  name: "",
  username: "",
  password: "",
};

const Register = () => {
  const [data, setData] = useState(initialData);
  const registerUserService = useApi(API_URLS.register);

  const router = useRouter();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onRegister = async (e) => {
    e.preventDefault();

      registerUserService.call(data);
      setData(initialData);

      if (registerUserService.response === 200) {
        router.push("/login");
      }
     else{
      console.log(registerUserService.error);
    }
  };

  return (
    <div className=" flex h-screen w-full justify-center items-center">
      <form
        action=""
        className="drop-shadow-lg flex flex-col gap-4 items-center w-1/4 border-2 p-8 bg-slate-300 "
      >
        <h1 className="text-5xl mb-6">Register</h1>
        <input
          name="name"
          type="text"
          value={data.name}
          required
          onChange={(e) => onValueChange(e)}
          className=" w-full p-3 border  focus:outline-none "
          placeholder="Enter name"
        ></input>
        <input
          name="username"
          type="text"
          value={data.username}
          required
          onChange={(e) => onValueChange(e)}
          className=" w-full p-3 border focus:outline-none"
          placeholder="Enter username"
        ></input>
        <input
          name="password"
          type="password"
          value={data.password}
          required
          onChange={(e) => onValueChange(e)}
          className=" w-full p-3 focus:outline-none"
          placeholder="Enter password"
        ></input>
        <button
          className="p-3 rounded-lg bg-black w-full text-white"
          onClick={(e) => onRegister(e)}
        >
          {" "}
          Register
        </button>
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-bold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
