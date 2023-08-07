import { Link } from '@inertiajs/react';

export default function NavLink({ text = "Home", Icon, ...props }) {
    const active = route().current(props.href);
    return (
        <Link
            {...props}
            className={`flex items-center mb-3 w-full px-4 py-2 text-sm leading-5 ${active ? '' : 'hover:text-gray-700 hover:bg-gray-100'} ${active ? ' bg-gray-100/25' : ''} focus:outline-none transition duration-150`}
        >
            <Icon className='mr-2 text-lg' />
            {text}
        </Link>
    );
}
