'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from "next/navigation";
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';

const initialData = {
    username:"",
    password:""
};

export default function Home() {


  const [data,setData] = useState(initialData);
  const validateUserService = useApi(API_URLS.login);

    const router = useRouter();

    const onValueChange = (e) => {
        setData({...data,[e.target.name]:e.target.value})
    }

    const onLogin = async(e) => {
      e.preventDefault();

      
        validateUserService.call(data)
        setData(initialData);
  
        if (validateUserService.response === 201) {
          router.push("/profile");
        }
        else {
        console.log(validateUserService.error);
      }
    }


  return (
    <div className=' flex h-screen w-full justify-center items-center'>
      <form action="" className="drop-shadow-lg flex flex-col gap-4 items-center w-1/4 border-2 p-8 bg-slate-300 ">
        <h1 className='text-5xl mb-6'>Login</h1>
        <input name="username" type="text" value={data.username} required onChange={(e) => onValueChange(e)} className=' w-full p-3 border focus:outline-none' placeholder='Enter username'></input>
        <input name="password" type="password" value={data.password} required onChange={(e) => onValueChange(e)} className=' w-full p-3 focus:outline-none' placeholder='Enter password'></input>
        <button className='p-3 rounded-lg bg-black w-full text-white' onClick={(e) => onLogin(e)}> Login</button>
        <p>Don't have an account? <Link href="/" className='font-bold'>Register</Link></p>
      </form>
    </div>
  )
}
