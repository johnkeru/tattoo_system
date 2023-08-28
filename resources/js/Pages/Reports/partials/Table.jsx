import { getQueryParameters } from '@/Utils/url_queries';
import { useForm } from '@inertiajs/react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Tab,
    Tabs,
    TabsHeader,
    Typography
} from "@material-tailwind/react";
import axios from 'axios';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import Row from "./Row";

const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Latest",
        value: "latest",
    },
    {
        label: "Oldest",
        value: "oldest",
    },
];

const TABS_METHOD = [
    {
        label: "Delete",
        value: "delete",
        color: 'text-red-500'
    },
    {
        label: "Update",
        value: "update",
        color: 'text-blue-500'
    },
    // {
    //     label: "Add",
    //     value: "add",
    //     color: 'text-green-500'
    // },
];

const TABLE_HEAD = ["Report Name", "Status", "Report Data", "Report Date"];

export function ReportsTable({ reports, setReports }) {
    const { get } = useForm();
    const [currentUrl, setCurrentUrl] = useState(route('queryReports') + "?")
    const [search, setSearch] = useState('');

    const handleFilter = (query, e) => {
        e ? e.preventDefault() : undefined
        if (query.includes('all')) {
            get(route('reports'))
            return;
        }
        axios.get(getQueryParameters(currentUrl, query, setCurrentUrl))
            .then(res => setReports(res.data.reports))
    }

    const handlePagination = (url) => {
        if (url) {
            const query = new URL(url).search.replace('?', '') + '&';
            axios.get(getQueryParameters(currentUrl, query, setCurrentUrl))
                .then(res => {
                    setReports(res.data.reports)
                })
        } else {
            axios.get('')
                .then(res => {
                    setReports(res.data.reports)
                })
        }
    }


    return (
        <Card className="h-full w-full rounded-none bg">
            <CardHeader floated={false} shadow={false} className="pb-10 rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Reports and Analytics
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Total of {reports.total} reports.
                        </Typography>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-20">
                    <Tabs value='all' className="w-full md:w-max bg-blue-gray-100 rounded-md">
                        <TabsHeader>
                            {TABS.map(({ label, value }) => (
                                <Tab onClick={() => handleFilter(`tab=${value}&`)} key={value} value={value} className='font-medium text-blue-gray-700'>
                                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>

                    <div className="flex items-center gap-3">
                        <h2>Methods: </h2>
                        <Tabs value='none' className="w-full md:w-max bg-blue-gray-100 rounded-md">
                            <TabsHeader>
                                {TABS_METHOD.map(({ label, value, color }) => (
                                    <Tab onClick={() => handleFilter(`method=${value}&`)} key={label} value={value} className={color + ' font-medium'}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                    </div>
                    <form className="w-full md:w-72" onSubmit={(e) => handleFilter(`search=${search}&`, e)}>
                        <Input label="Search" value={search} onChange={e => setSearch(e.target.value)}
                            icon={<FiSearch type='submit' className='cursor-pointer' />} />
                    </form>
                </div>
            </CardHeader>
            <CardBody className="overflow-y-scroll p-0" >
                <table className="mt-0 w-full min-w-max table-auto text-left">
                    <thead className='w-full sticky top-0 left-0 bg-blue-gray-100 z-40'>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className="p-4">
                                    <Typography
                                        variant="small"
                                        className="font-bold leading-none opacity-80 text-blue-gray-900"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {reports.data.length === 0 ? <tr>
                            <td className='p-5 text-blue-gray-500'>No results.</td>
                        </tr> :
                            reports.data.map((report, index) => {
                                const isLast = index === reports.data.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={report.id} className='even:bg-blue-gray-50'>
                                        <Row classes={classes} report={report} />
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </CardBody >
            <CardFooter className="flex items-center justify-between border-t-2 border-blue-gray-100 p-2 px-5">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page <span className={reports.current_page > reports.last_page ? 'text-red-500 font-bold' : undefined}>{reports.current_page}</span> of {reports.last_page}
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" disabled={!reports.prev_page_url} size="sm" onClick={() => handlePagination(reports.prev_page_url)}>
                        Previous
                    </Button>
                    <Button variant="outlined" disabled={!reports.next_page_url} size="sm" onClick={() => handlePagination(reports.next_page_url)}>
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card >
    );
}