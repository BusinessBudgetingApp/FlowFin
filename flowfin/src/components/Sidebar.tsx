'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Category, DirectboxReceive, DirectboxSend, LogoutCurve } from 'iconsax-react'
import Logo2 from '../../public/Logo2.png'

export default function Sidebar() {
    const pathname = usePathname()
    const isActive = (href: string): boolean => href === pathname

    return (
        <>
            <div className="sidebar w-[240px] min-h-screen bg-white px-4 py-6">
                <Link href="/">
                    <div className="logo pt-2 pb-8 flex items-center justify-center">
                        <picture>
                            <img src={Logo2.src} width={130} height={130} alt="" />
                        </picture>
                    </div>
                </Link>

                <div className="sidebar-content">
                    <div className="menu pb-3 border-b-1 border-[#B7BBC0]">
                        <h1 className='text-[18px] font-bold text-[#212121] px-2 py-2'>Menu</h1>

                        <Link href="/dashboard">
                            <button className={isActive("/dashboard")
                                ? 'group flex gap-3 px-5 py-2.5 mt-1 items-center text-[16px] font-semibold  w-full bg-[#F2F2F2] text-[#00859B] rounded-md cursor-pointer'
                                : "group flex gap-3 px-5 py-2.5 mt-1 items-center text-[16px] font-semibold w-full hover:bg-[#F2F2F2] hover:text-[#00859B] rounded-md cursor-pointer"}>
                                <Category size="20" className='icon fill-[#797B8C] group-hover:fill-[#00859B]' variant="Bold" />
                                Dashboard
                            </button>
                        </Link>

                        <Link href="/pendapatan">
                            <button className={isActive("/pendapatan")
                                ? 'group flex gap-3 px-5 py-2.5 mt-1 items-center text-[16px] font-semibold  w-full bg-[#F2F2F2] text-[#00859B] rounded-md cursor-pointer'
                                : "group flex gap-3 px-5 py-2.5 mt-1 items-center text-[16px] font-semibold w-full hover:bg-[#F2F2F2] hover:text-[#00859B] rounded-md cursor-pointer"}>
                                <DirectboxReceive size="20" className='icon fill-[#797B8C] group-hover:fill-[#00859B]' variant="Bold" />
                                Pendapatan
                            </button>
                        </Link>

                        <Link href="/pengeluaran">
                            <button className={isActive("/pengeluaran")
                                ? 'group flex gap-3 px-5 py-2.5 mt-1 items-center text-[16px] font-semibold  w-full bg-[#F2F2F2] text-[#00859B] rounded-md cursor-pointer'
                                : "group flex gap-3 px-5 py-2.5 mt-1 items-center text-[16px] font-semibold w-full hover:bg-[#F2F2F2] hover:text-[#00859B] rounded-md cursor-pointer"}>
                                <DirectboxSend size="20" className='icon fill-[#797B8C] group-hover:fill-[#00859B]' variant="Bold" />
                                Pengeluaran
                            </button>
                        </Link>
                    </div>

                    <div className="account py-3">
                        <h1 className='text-[18px] font-bold text-[#212121] px-2 py-2'>Account</h1>
                        <button className='group flex gap-3 px-5 py-2.5 my-1 items-center text-[16px] font-semibold  w-full hover:bg-[#F2F2F2] hover:text-[#00859B] rounded-md cursor-pointer'><LogoutCurve size="20" className='icon fill-[#797B8C] group-hover:fill-[#00859B]' variant="Bold" />Sign Out</button>
                    </div>
                </div>
            </div>
        </>
    )
}
