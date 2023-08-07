import Toast from '@/Context/Toaster';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { AiOutlineStock } from 'react-icons/ai';
import { MdOutlineManageSearch } from 'react-icons/md';
import { HiDocumentReport } from 'react-icons/hi';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { dateconverter, formatDateToCustomFormat } from '@/Utils/dateconverter';

export default function Dashboard({ auth, data }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Toast />
            <Head title="Dashboard" />

            <div className="bg-gray-50 shadow-sm sm:rounded-lg">
                <div className='p-5'>
                    <div className='flex gap-3 mb-3'>
                        <Link href='/stocks' className='bg-white rounded-sm w-full shadow-md hover:shadow-lg cursor-pointer p-5'>
                            <div className='flex flex-col justify-between'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold text-gray-500'>Stocks</h1>
                                    <div className='bg-yellow-500 p-3 rounded-full'>
                                        <AiOutlineStock className='text-3xl text-white' />
                                    </div>
                                </div>
                                <h2 className='mt-2 text-4xl font-bold text-gray-600'>Costs ₱{data.stocks.total_costs}</h2>
                                <h2 className='text-1xl font-bold text-gray-500'>{data.stocks.total_product} Products</h2>
                            </div>
                        </Link>

                        <Link href='/management' className='bg-white rounded-sm w-full shadow-md hover:shadow-lg cursor-pointer p-5'>
                            <div className='flex flex-col justify-between'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold text-gray-500'>Management</h1>
                                    <div className='bg-green-500 p-3 rounded-full'>
                                        <MdOutlineManageSearch className='text-3xl text-white' />
                                    </div>
                                </div>
                                <h2 className='mt-2 text-4xl font-bold text-gray-600'>CRUD</h2>
                            </div>
                        </Link>

                        <Link href='/reports' className='bg-white rounded-sm w-full shadow-md hover:shadow-lg cursor-pointer p-5'>
                            <div className='flex flex-col justify-between'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold text-gray-500'>Reports</h1>
                                    <div className='bg-red-500 p-3 rounded-full'>
                                        <HiDocumentReport className='text-3xl text-white' />
                                    </div>
                                </div>
                                <h2 className='mt-2 text-4xl font-bold text-gray-600'>Total Reports {data.reports.total_reports}</h2>
                            </div>
                        </Link>
                    </div>

                    <div className='flex gap-3'>
                        <div className='rounded-sm shadow-md hover:shadow-lg p-5 w-1/3 bg-white'>
                            <h3 className='text-2xl font-bold text-gray-500 mb-5'>Latest Stocks</h3>
                            <div>
                                {
                                    data.stocks.stocks.map(st => {
                                        return <div key={st.id} className='flex items-center justify-between gap-3 mb-2 py-1  border-b dark:border-neutral-200'>
                                            <div className='flex items-center gap-3'>
                                                <img src={st.image} className='w-[40px] h-[40px]' />
                                                <div>
                                                    <h3 className='font-bold text-gray-600'>{st.item_name}</h3>
                                                    <p className='text-gray-400'>{dateconverter(st.created_at)}</p>
                                                </div>
                                            </div>
                                            <div className="p-2 cursor-pointer">
                                                <BiDotsVerticalRounded className='text-gray-600' />
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>

                        <div className='rounded-sm shadow-md hover:shadow-lg p-5 w-2/3 bg-white'>
                            <h3 className='text-2xl font-bold text-gray-500 mb-5'>Order Details</h3>
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full text-left text-sm font-light">
                                                <thead className="border-b font-medium dark:border-neutral-300">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-4 uppercase">Product Name</th>
                                                        <th scope="col" className="px-6 py-4 uppercase">Supplier</th>
                                                        <th scope="col" className="px-6 py-4 uppercase">Phone</th>
                                                        <th scope="col" className="px-6 py-4 uppercase">Date</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='absolute h-[60vh] overflow-y-scroll'>
                                                    {
                                                        data.stocks.stocks.map(st => {
                                                            return (
                                                                <tr key={st.id} className="border-b dark:border-neutral-200 hover:bg-gray-100">
                                                                    <td className="whitespace-nowrap px-6 py-4 font-medium flex items-center gap-3">
                                                                        <img src={st.image} className='w-[40px] h-[40px] rounded-full' />
                                                                        {st.item_name}
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{st.supplier.supplier_name}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{st.supplier.phone}</td>
                                                                    <td className="whitespace-nowrap px-6 py-4">{formatDateToCustomFormat(st.supplier.created_at)}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}
