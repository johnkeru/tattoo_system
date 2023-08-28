import Toast from '@/Context/Toaster';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { AiOutlineStock } from 'react-icons/ai';
import { MdOutlineManageSearch } from 'react-icons/md';
import { HiDocumentReport } from 'react-icons/hi';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { dateconverter } from '@/Utils/dateconverter';
import { DashboardTable } from '@/Components/DashboardTable';
import { BsArrowRight } from 'react-icons/bs'

export default function Dashboard({ auth, data }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={'Dashboard'}
        >
            <Toast />
            <Head title="Dashboard" />

            <div className="bg-blue-gray-50 shadow-sm sm:rounded-lg">
                <div className='p-5'>
                    <div className='flex gap-3 mb-3'>
                        <Link href='/stocks' className='bg-white rounded-sm w-full shadow-sm hover:shadow-md cursor-pointer p-5'>
                            <div className='flex flex-col justify-between'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold text-blue-gray-700'>Stocks</h1>
                                    <div className='bg-yellow-500 p-3 rounded-full'>
                                        <AiOutlineStock className='text-3xl text-white' />
                                    </div>
                                </div>
                                <h2 className='mt-2 mb-4 text-4xl font-bold text-blue-gray-700'>Costs ₱{data.stocks.total_costs}</h2>
                                <h2 className='text-1xl font-bold text-blue-gray-400'>{data.stocks.total_product} Products</h2>
                            </div>
                        </Link>

                        <Link href='/management' className='bg-white rounded-sm w-full shadow-sm hover:shadow-md cursor-pointer p-5'>
                            <div className='flex flex-col justify-between'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold text-blue-gray-700'>Management</h1>
                                    <div className='bg-green-500 p-3 rounded-full'>
                                        <MdOutlineManageSearch className='text-3xl text-white' />
                                    </div>
                                </div>
                                <h2 className='mt-2 text-4xl font-bold text-blue-gray-700'>CRUD</h2>
                            </div>
                        </Link>

                        <Link href='/reports' className='bg-white rounded-sm w-full shadow-sm hover:shadow-md cursor-pointer p-5'>
                            <div className='flex flex-col justify-between'>
                                <div className='flex justify-between items-center'>
                                    <h1 className='text-2xl font-bold text-blue-gray-700'>Reports</h1>
                                    <div className='bg-red-500 p-3 rounded-full'>
                                        <HiDocumentReport className='text-3xl text-white' />
                                    </div>
                                </div>
                                <h2 className='mt-2 text-4xl font-bold text-blue-gray-700'>Total Reports {data.reports.total_reports}</h2>
                            </div>
                        </Link>
                    </div>

                    <div className='flex gap-3'>
                        <div className='rounded-sm shadow-sm hover:shadow-md p-5 pb-0 w-1/3 bg-white'>
                            <h3 className='text-2xl font-bold text-blue-gray-800 mb-5'>Latest Stocks</h3>
                            <div>
                                {
                                    data.stocks.stocks.map(st => {
                                        return <div key={st.id} className='flex items-center justify-between gap-3 mb-2 py-1  border-b dark:border-neutral-200'>
                                            <div className='flex items-center gap-3'>
                                                <img src={st.image} className='w-[40px] h-[40px]' />
                                                <div>
                                                    <h3 className='font-bold text-blue-gray-700'>{st.item_name}</h3>
                                                    <p className='text-blue-gray-400'>{dateconverter(st.created_at)}</p>
                                                </div>
                                            </div>
                                            <div className="p-2 cursor-pointer">
                                                <BiDotsVerticalRounded className='text-blue-gray-600' />
                                            </div>
                                        </div>
                                    })
                                }
                                <Link className='flex items-center gap-3 justify-end text-sm text-blue-gray-400 hover:underline py-2' href='stocks'>
                                    View All
                                    <BsArrowRight />
                                </Link>
                            </div>
                        </div>

                        <div className='rounded-sm shadow-sm hover:shadow-md p-5 w-2/3 bg-white'>
                            <h3 className='text-2xl font-bold text-blue-gray-800 mb-5'>Order Details</h3>
                            <div className="flex flex-col">
                                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                        <DashboardTable stocks={data.stocks.stocks} />
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
