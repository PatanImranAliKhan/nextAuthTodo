import { useState, useEffect } from 'react'

import { getProviders, signIn } from 'next-auth/react'
import LogoProvider from '@components/LogoProvider'

const Authenticate = ({text, handleSubmit}) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setUpProviders = async () => {
          const resp = await getProviders();
          setProviders(resp);
        }
        setUpProviders();
      }, [providers])

    return (
        <div>
            <section className='authenticate__form'>
                <h1 className='text-center text-5xl font-bold mt-3 mb-8'>
                    {text}
                </h1>
                <div className='flex flex-col gap-10'>
                    <form className='flex-col w-[80%] max-sm:w-full m-auto border-b-4' onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit({email: email, password: password});                       
                    }}>
                        <input type='email' value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email' required />
                        <input type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password' />
                        <button type='submit' 
                            className='w-full text-center rounded-full bg-white py-3 px-10'>
                            <span className='text-md text-black text-bold'>{text}</span>
                        </button>
                        <br />
                        &nbsp;
                    </form>
                    <div className='flex flex-col gap-5'>
                    {
                        providers && Object.values(providers).map((provider) =>
                          <button type='button' key={provider.name}
                            onClick={() => { signIn(provider.id) }}
                          > < LogoProvider name={provider.name}/> {provider.name}</button>
                        )
                      }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Authenticate