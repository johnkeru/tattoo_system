import Toast from '@/Context/Toaster'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import React, { useState } from 'react'
import { ReportsTable } from './partials/Table'

const Index = ({ auth, initialReports }) => {

    const [reports, setReports] = useState(initialReports)

    return (
        <Authenticated
            user={auth.user}
            header={'Reports'}
        >
            <Toast />
            <Head title="Reports" />

            <ReportsTable reports={reports} setReports={setReports} />
        </Authenticated>
    )
}

export default Index