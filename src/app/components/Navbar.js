'use client'
import { useRouter } from 'next/navigation'

export default async function Navbar() {
    const router = useRouter();
    return(
        <div className="flex w-full px-4 lg:px-40 py-4 items-center border-b text-center justify-between">
            <div className="flex gap-4 items-center">
                <button type="button" onClick={() => router.push('/')} className="font-bold text-xl" style={{ color: '#9b59b6' }}>Home</button>
                <button type="button" onClick={() => router.push('/dashboard')} className="font-bold text-xl" style={{ color: '#9b59b6' }}>Dashboard</button>
            </div>
            <div></div>
        </div>
    )
}
