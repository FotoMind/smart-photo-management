'use client'
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const router = useRouter();

    return(
        <div className='p-5 bg-blue'>
            <div className=''>
                <button type="button" onClick={() => router.push('/')} className="px-10 font-light text-xl text-white">Home</button>
                <button type="button" onClick={() => router.push('/dashboard')} className="px-10 font-light text-xl text-white">Gallery</button>
                <button type="button" onClick={() => router.push('/sign-in')} className="px-10 font-light text-xl float-right text-red border-2 rounded-lg">Sign In</button>
            </div>
        </div>
    )
}
