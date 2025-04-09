"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Category,
    DirectboxReceive,
    DirectboxSend,
    LogoutCurve,
    CloseSquare,
} from "iconsax-react";
import Logo2 from "../../public/Logo2.png";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 1024);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isActive = (href: string): boolean => href === pathname;

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            router.push("/signin");
        } catch (error) {
            console.error("Failed to sign out:", error);
        }
    };

    return (
        <>
            {isSmallScreen && !isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed lg:hidden z-30 top-4 left-4 p-2 rounded-md bg-white"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            )}

            {/* Overlay */}
            {isSmallScreen && isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-10"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`sidebar w-[310px] min-h-screen bg-white px-4 py-6 fixed lg:relative z-10 transition-all duration-300 ease-in-out ${isSmallScreen ? (isOpen ? "left-0" : "-left-full") : "left-0"
                    }`}
            >
                <Link href="/">
                    <div className="logo pt-2 pb-8 flex items-center justify-center">
                        <picture>
                            <img src={Logo2.src} width={130} height={130} alt="Logo" />
                        </picture>
                    </div>
                </Link>

                <div className="sidebar-content">
                    <div className="menu pb-3 border-b border-[#B7BBC0]">
                        <h1 className="text-[18px] font-bold text-[#212121] px-2 py-2">
                            Menu
                        </h1>

                        <Link href="/" onClick={() => setIsOpen(false)}>
                            <button
                                className={`group flex gap-3 px-5 py-2.5 mt-1 items-center text-[16px] font-semibold w-full rounded-md cursor-pointer ${isActive("/")
                                        ? "bg-[#F2F2F2] text-[#00859B]"
                                        : "hover:bg-[#F2F2F2] hover:text-[#00859B]"
                                    }`}
                            >
                                <Category
                                    size="20"
                                    className="icon fill-[#797B8C] group-hover:fill-[#00859B]"
                                    variant="Bold"
                                />
                                Dashboard
                            </button>
                        </Link>

                        <Link href="/pendapatan" onClick={() => setIsOpen(false)}>
                            <button
                                className={`group flex gap-3 px-5 py-2.5 mt-1 items-center text-[16px] font-semibold w-full rounded-md cursor-pointer ${isActive("/pendapatan")
                                        ? "bg-[#F2F2F2] text-[#00859B]"
                                        : "hover:bg-[#F2F2F2] hover:text-[#00859B]"
                                    }`}
                            >
                                <DirectboxReceive
                                    size="20"
                                    className="icon fill-[#797B8C] group-hover:fill-[#00859B]"
                                    variant="Bold"
                                />
                                Pendapatan
                            </button>
                        </Link>

                        <Link href="/pengeluaran" onClick={() => setIsOpen(false)}>
                            <button
                                className={`group flex gap-3 px-5 py-2.5 mt-1 items-center text-[16px] font-semibold w-full rounded-md cursor-pointer ${isActive("/pengeluaran")
                                        ? "bg-[#F2F2F2] text-[#00859B]"
                                        : "hover:bg-[#F2F2F2] hover:text-[#00859B]"
                                    }`}
                            >
                                <DirectboxSend
                                    size="20"
                                    className="icon fill-[#797B8C] group-hover:fill-[#00859B]"
                                    variant="Bold"
                                />
                                Pengeluaran
                            </button>
                        </Link>
                    </div>

                    <div className="account py-3">
                        <h1 className="text-[18px] font-bold text-[#212121] px-2 py-2">
                            Account
                        </h1>
                        <button
                            onClick={handleSignOut}
                            className="group flex gap-3 px-5 py-2.5 my-1 items-center text-[16px] font-semibold w-full hover:bg-[#F2F2F2] hover:text-[#00859B] rounded-md cursor-pointer"
                        >
                            <LogoutCurve
                                size="20"
                                className="icon fill-[#797B8C] group-hover:fill-[#00859B]"
                                variant="Bold"
                            />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
