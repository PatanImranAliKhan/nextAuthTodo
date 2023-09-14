"use client"

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import Authenticate from '@components/Authenticate';

const Login = () => {

    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
      if(session?.user) {
        router.push("/")
      }
    }, [session])

    const handleSubmit = (credentials) => {

    }
    
  return (
    <section>
        <Authenticate text="Login" handleSubmit={handleSubmit} />
    </section>
  )
}

export default Login