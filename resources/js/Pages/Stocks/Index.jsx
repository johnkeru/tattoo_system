import Toast from '@/Context/Toaster'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Index = ({ auth }) => {
    return (
        <Authenticated
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Stocks</h2>}
            title="Stocks"
        >
            <Toast />
            <Head title="Stocks" />
            <div>{auth.user.email} awefawe</div>
        </Authenticated>
    )
}

export default Index