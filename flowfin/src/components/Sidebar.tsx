import { Category, DirectboxReceive, DirectboxSend, LogoutCurve } from 'iconsax-react'
import Logo2 from '../../public/Logo2.png'

export default function Sidebar() {
    return (
        <>
            <div className="sidebar w-[240px] h-[100vh] bg-white px-4 py-6">
                <div className="logo pt-2 pb-8 flex items-center justify-center">
                    <picture>
                        <img src={Logo2.src} width={130} height={130} alt="" />
                    </picture>
                </div>

                <div className="sidebar-content">
                    <div className="menu pb-3 border-b-1 border-[#B7BBC0]">
                        <h1 className='text-[18px] font-bold text-[#212121] px-2 py-2'>Menu</h1>
                        <button className='group flex gap-3 px-5 py-2.5 mt-1 items-center text-[16px] font-semibold  w-full hover:bg-[#F2F2F2] hover:text-[#00859B] rounded-md '><Category size="20" className='icon fill-[#797B8C] group-hover:fill-[#00859B]' variant="Bold" />Dashboard</button>
                        <button className='group flex gap-3 px-5 py-2.5 mt-1 items-center text-[16px] font-semibold  w-full hover:bg-[#F2F2F2] hover:text-[#00859B] rounded-md '><DirectboxReceive size="20" className='icon fill-[#797B8C] group-hover:fill-[#00859B]' variant="Bold" />Pendapatan</button>
                        <button className='group flex gap-3 px-5 py-2.5 my-1 items-center text-[16px] font-semibold  w-full hover:bg-[#F2F2F2] hover:text-[#00859B] rounded-md '><DirectboxSend size="20" className='icon fill-[#797B8C] group-hover:fill-[#00859B]' variant="Bold" />Pengeluaran</button>
                    </div>

                    <div className="account py-3">
                        <h1 className='text-[18px] font-bold text-[#212121] px-2 py-2'>Account</h1>
                        <button className='group flex gap-3 px-5 py-2.5 my-1 items-center text-[16px] font-semibold  w-full hover:bg-[#F2F2F2] hover:text-[#00859B] rounded-md '><LogoutCurve size="20" className='icon fill-[#797B8C] group-hover:fill-[#00859B]' variant="Bold" />Sign Out</button>
                    </div>
                </div>
            </div>
        </>
    )
}
