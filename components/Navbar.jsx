"use client"

import { useState, useEffect } from "react";
import Image from "next/image"
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";

const Navbar = () => {

  const { data: session } = useSession();
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const router = useRouter();

  return (
    <nav className='w-full flex flex-row justify-between pt-5 px-10'>
      <div className="flex gap-5">
        <Image
          src="/assets/todoLogo.png"
          alt="Logo"
          width={50}
          height={50}
        />
        <p className="pt-3 font-bold text-4xl">ToDo</p>
      </div>
      <div className="sm:hidden flex">
        {
          session?.user.id ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                width={50}
                height={50}
                alt="profile Pic"
                className='rounded-full'
                onClick={() => { setToggleDropDown((prev) => !prev) }}
              />
              {
                toggleDropDown && (
                  <div className="h-auto w-auto p-20 bg-white text-black">
                    <p className="my-20 mx-10"
                      onClick={() => (signOut())}
                    >SignOut</p>
                  </div>
                )
              }
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <Image
                src="/assets/profile.png"
                width={40}
                height={40}
                alt="profile Pic"
                className='rounded-full'
                onClick={() => { setToggleDropDown((prev) => !prev) }}
              />
              <div className="relative">
                {
                  toggleDropDown && (
                    <div className="dropdown text-grey-500">
                      <p className="dropdown_link"
                        onClick={() => { router.push("/login") }}
                      >login</p>
                      <p className="dropdown_link"
                        onClick={() => { router.push("/signup") }}
                      >Signup</p>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
      <div className="flex max-sm:hidden">
        {
          session?.user.id ? (
            <div className="flex">
              <Image
                src={session?.user.image}
                width={50}
                height={50}
                alt="profile Pic"
                className='rounded-full'
              />
              <div>
                <button type="button" className="py-3 px-5 text-md bg-blue-500 rounded-full"
                  onClick={() => { signOut() }}
                >
                  <span>Signout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-5">
              <span className="py-3 px-5 text-md bg-blue-500 rounded-full"
                onClick={() => { router.push("/login") }}>
                Login
              </span>
              <span className="py-3 px-5 text-md bg-orange-500 rounded-full"
                onClick={() => { router.push("/signup") }} >
                Signup
              </span>
              <Image
                src="/assets/profile.png"
                width={50}
                height={40}
                alt="profile Pic"
                className='rounded-full'
              />
            </div>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar