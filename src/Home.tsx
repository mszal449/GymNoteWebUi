import React from 'react'
import LoginButton from './components/Login'
import { useAuth } from './providers/AuthProvider';
import { Button } from '@mantine/core';


const Home = () => {
  const {user} = useAuth();
  return (
    <div className='flex flex-col items-center'>
        <div className='text-4xl pb-10'>Welcome to Gymnote Web API</div>
        {user ? (
            <Button className='' onClick={() => window.location.href = '/dashboard'}>Go to Dashboard</Button>
        ) : 
        <LoginButton />
        }

    </div>
  )
}


export default Home