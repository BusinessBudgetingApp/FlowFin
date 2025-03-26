import DataTable from "./DataTable";

export default function MainContent() {
    return (
        <>
            <div className="main-content px-6 py-6 h-[100vh]">
                <div className="content bg-white p-4 rounded-md">
                    <div className="flex items-center w-full justify-between pb-2">
                        <div className="">
                            <h1 className='text-lg font-bold'>List Product</h1>
                            <p className='text-gray-500'>You can manage your product here seamslessly</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-4">
                                <h2 className='font-medium items-center text-gray-500'>Sort by</h2>
                                <button className='btn-filter border border-gray-300 px-4 py-3 rounded-md font-semibold text-[14px] cursor-pointer flex gap-2 items-center'>Price</button>
                            </div>
                            {/* <AddProduct /> */}
                        </div>
                    </div>
                    <DataTable />
                </div>
            </div>
        </>
    )
}
