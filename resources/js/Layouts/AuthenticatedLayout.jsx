
import {
    Card,
    List,
    Typography
} from "@material-tailwind/react";

import NavLink from "@/Components/NavLink";
import { usePage } from "@inertiajs/react";
import { AiOutlineStock } from 'react-icons/ai';
import { BiSolidDashboard } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { HiOutlineLogout } from 'react-icons/hi';
import { MdManageAccounts } from 'react-icons/md';
import { SiSimpleanalytics } from 'react-icons/si';

export default function AuthenticatedLayout({ user, header = "Dashboard", children }) {

    const { manage_badge, reports_badge } = usePage().props;

    return (
        <div className="flex">
            <Card className="h-screen w-1/5 p-4 shadow-xl shadow-blue-gray-900/5 bg-[#111826] rounded-none">
                <div className="mb-2 p-4">
                    <Typography variant="h5" color="white">
                        OSSMSTP System
                    </Typography>
                </div>
                <List>
                    <NavLink text='Dashboard' Icon={BiSolidDashboard} href="dashboard" />
                    <NavLink text='Stock/Supplies' Icon={AiOutlineStock} href='stocks' />
                    <NavLink text='Stock Management' Icon={MdManageAccounts} href='management' manage_badge={manage_badge} />
                    <NavLink text='Reports and Analytics' Icon={SiSimpleanalytics} href='reports' reports_badge={reports_badge} />
                    <hr className="my-5 border-blue-gray-700" />
                    <NavLink text={user.email} Icon={CgProfile} href='profile' />
                    <NavLink text='Logout' Icon={HiOutlineLogout} href={route('logout')} method="post" as="button" />
                </List>
            </Card>

            <main className="w-4/5 relative">

                <div className="sticky w-full top-0 left-0 flex items-center bg-[#2b3958] text-white p-5 px-10 justify-between">
                    <div className="flex items-center justify-between gap-5">
                        <h2 className='text-3xl font-bold'>{header}</h2>
                        <p className='text-md'>Control Panel</p>
                    </div>
                    {/* other content for header */}
                </div>

                <div className='sticky w-full h-[83vh] overflow-y-scroll'>
                    {children}
                </div>

                <div className='absolute w-full bottom-0 left-0 px-5 py-4 text-sm bg-blue-gray-100 text-blue-gray-900'>
                    <span className='font-bold'>
                        Copyright © ONLINE SUPPLIES AND SERVICES MANAGEMENT SYSTEM FOR TATTOO PROJECT.
                    </span> All rights reserved 2023.
                </div>
            </main>
        </div>
    );
}
