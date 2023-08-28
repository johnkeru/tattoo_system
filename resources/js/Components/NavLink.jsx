import { Link } from '@inertiajs/react';

export default function NavLink({ text = "Home", Icon, reports_badge = 0, manage_badge = 0, ...props }) {
    const active = route().current(props.href);
    return (
        <div className="relative">

            <Link
                {...props}
                className={`
            flex items-center mb-2 w-full px-4 p-3 rounded-md ${active ? 'bg-blue-gray-800' : 'bg-blue-gray-800/25 hover:bg-blue-gray-700/30'} text-gray-50 leading-5 focus:outline-none transition duration-150`}
            >
                <Icon className='mr-2 text-lg' />
                {text}
            </Link>

            {text.includes('Management') && manage_badge ? <div className="bg-red-500 py-[3px] px-[9px] text-center rounded-full absolute -top-2 -right-2 text-white text-sm">{manage_badge}</div> : undefined}
            {text.includes('Reports') && reports_badge ? <div className="bg-red-500 py-[3px] px-[9px] text-center rounded-full absolute -top-2 -right-2 text-white text-sm">{reports_badge}</div> : undefined}
        </div>
    );
}
