import { ArrowDown2, ArrowLeft2, ArrowRight2 } from "iconsax-react";

export default function PaginationPengeluaran() {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="items-center pt-5 pb-2.5">
                    <button className="border border-[#B7BBC0] px-4 py-2 rounded-md text[10px] font-medium flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-[#212121]">10 Baris<ArrowDown2 size="20" color="#797B8C" variant="Bold" /></button>
                </div>
                <div className="flex items-center justify-center pt-5 pb-2.5 gap-3">
                    <button className="border border-[#B7BBC0] px-4 py-2 rounded-md text[10px] font-medium flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-[#797B8C]"><ArrowLeft2 size="20" color="#797B8C" variant="Bold" />Sebelumnya</button>
                    <button className="border border-white px-4 py-2 rounded-md text[10px] font-medium flex items-center gap-2 cursor-pointer bg-[#00859B] text-white">1</button>
                    <button className="border border-[#B7BBC0] px-4 py-2 rounded-md text[10px] font-medium flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-[#212121]">2</button>
                    <button className="border border-[#B7BBC0] px-4 py-2 rounded-md text[10px] font-medium flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-[#212121]">3</button>
                    <button className="border border-[#B7BBC0] px-4 py-2 rounded-md text[10px] font-medium flex items-center gap-2 cursor-pointer hover:bg-gray-100 text-[#212121]">Selanjutnya<ArrowRight2 size="20" color="#797B8C" variant="Bold" /></button>
                </div>
            </div>
        </>
    )
}
