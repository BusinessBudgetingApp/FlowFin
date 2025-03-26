export default function DataTable() {
    return (
        <>
            <table className="table-auto mt-4 w-full text-left">
                <thead>
                    <tr className=''>
                        <th className='bg-gray-100 p-3 font-semibold rounded-tl-lg'>No</th>
                        <th className='bg-gray-100 p-3 font-semibold'>Product Name</th>
                        <th className='bg-gray-100 p-3 font-semibold'>Price</th>
                        <th className='bg-gray-100 p-3 font-semibold'>Description</th>
                        <th className='bg-gray-100 p-3 font-semibold rounded-tr-lg'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='border-b-2 border-gray-200'>
                        <td className='index-info px-3'>test</td>
                        <td className='product-name py-4 flex items-center gap-4'>

                        </td>
                        <td className='price-info px-3'>test</td>
                        <td className='desc-info px-3'>Test</td>
                        <td className='action px-3'>
                            <button className='bg-gray-100 p-3 rounded-md cursor-pointer m-3 hover:bg-red-600 hover:text-white'>
                                Test
                            </button>
                            <button className='bg-gray-100 p-3 rounded-md cursor-pointer m-3 hover:bg-red-600 hover:text-white'>
                                Test
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}
