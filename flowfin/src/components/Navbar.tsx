"use client";

import { useEffect, useState } from 'react';
import avatar from '../../public/avatar.png';
import AI from '../../public/AI.png';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Navbar() {
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserName(user.displayName || user.email || "User");
            } else {
                setUserName(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <>
            <nav className='sticky top-0 z-10 main-container w-full h-fit bg-[#F6F6F6]'>
                <div className="navbar-container flex justify-between px-10 py-4 bg-white items-center">
                    <h1 className='header-title font-bold text-[24px] text-[#212121]'>Dashboard</h1>
                    <div className="flex items-center gap-5">
                        <button className='flex bg-[#0C0011] px-5 py-2 gap-2 rounded-full items-center cursor-pointer'>
                            <picture>
                                <img src={AI.src} width={26} height={26} alt="" />
                            </picture>
                            <h1 className='font-semibold text-[16px] text-white'>AI Insight</h1>
                        </button>
                        <div className="flex items-center gap-3 pl-5 pr-3 border-l-1 border-[#B7BBC0]">
                            <picture>
                                <img src={avatar.src} width={36} height={36} alt="" />
                            </picture>
                            <h1 className='font-semibold text-[16px]'>
                                Hi, {userName || 'Loading...'}
                            </h1>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
