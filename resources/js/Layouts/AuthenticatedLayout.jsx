import NavLink from '@/Components/NavLink';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineStock } from 'react-icons/ai';
import { CgProductHunt, CgProfile } from 'react-icons/cg';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdManageAccounts, MdOutlineSpaceDashboard } from 'react-icons/md';
import { SiSimpleanalytics } from 'react-icons/si';

export default function Authenticated({ user, header, children, title = "Dashboard" }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex-col w-full md:flex md:flex-row md:min-h-screen">
            <div
                onClick={() => setOpen(false)}
                className="flex flex-col flex-shrink-0 w-full text-gray-700 bg-white md:w-64 dark:text-gray-200 dark:bg-gray-800"
            >
                <div onClick={() => {
                    toast.success('awefwew')
                }} className="flex flex-row items-center justify-between flex-shrink-0 px-8 py-4 mb-5">
                    <a href="#"
                        className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline"
                    >
                        OSSMSTP System
                    </a>
                </div>

                <nav className={`flex-grow px-4 pb-4 md:block md:pb-0 md:overflow-y-auto ${open ? 'block' : 'hidden'}`}>
                    <NavLink text='Dashboard' Icon={MdOutlineSpaceDashboard} href="dashboard" />
                    <NavLink text='Stock/Supplies' Icon={AiOutlineStock} href='stocks' />
                    <NavLink text='Stock Management' Icon={MdManageAccounts} href='management' />
                    <NavLink text='Reports and Analytics' Icon={SiSimpleanalytics} href='reports' />
                    <NavLink text='Suppliers' Icon={CgProductHunt} href='suppliers' />

                    <div className='w-full bg-gray-500 my-10' style={{ height: '0.3px' }}></div>

                    <NavLink text={user.email} Icon={CgProfile} href='profile' />
                    <NavLink text='Logout' Icon={HiOutlineLogout} href={route('logout')} method="post" as="button" />
                </nav>
            </div>
            <main className="w-full bg-slate-50 relative">

                <div className="sticky w-full top-0 left-0 flex items-center gap-30 bg-gray-500 text-white p-5 gap-5">
                    <h2 className='text-3xl font-bold'>{title}</h2>
                    <p className='text-md'>Control Panel</p>
                </div>

                <div className='sticky w-full h-[83vh] overflow-y-scroll'>
                    {children}
                </div>

                <div className='absolute w-full bottom-0 left-0 px-5 py-4 text-sm bg-gray-200 text-gray-700 border-t-2 border-gray-300'>
                    <span className='font-bold'>
                        Copyright © ONLINE SUPPLIES AND SERVICES MANAGEMENT SYSTEM FOR TATTOO PROJECT.
                    </span> All rights reserved 2023.
                </div>
            </main>
        </div>
    );
}
