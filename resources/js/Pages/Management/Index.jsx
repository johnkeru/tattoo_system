import Toast from '@/Context/Toaster'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { useState } from 'react'
import StocksTable from './partials/Table'

const Index = ({ auth, initialStocks }) => {
    const [stocks, setStocks] = useState(initialStocks);
    return (
        <Authenticated
            user={auth.user}
            header={'Management'}
        >
            <Toast />
            <Head title="Management" />

            <StocksTable stocks={stocks} setStocks={setStocks} />

        </Authenticated>
    )
}

export default Index