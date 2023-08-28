import { ViewImage } from '@/Components/ViewImage';
import { formatDateToCustomFormat } from '@/Utils/dateconverter';
import { getQueryParameters } from '@/Utils/url_queries';
import { useForm } from '@inertiajs/react';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Input,
    Tab,
    Tabs,
    TabsHeader,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import axios from 'axios';
import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdAdd } from 'react-icons/io';
import { MdRemoveCircleOutline } from 'react-icons/md';
import { DeleteDialog } from './DeleteDialog';
import { EditDialog } from './EditDialog';

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

const QUANTITY_TABS = [
    {
        label: "↓3",
        value: "<",
        color: 'text-red-700'
    },
    {
        label: "↑4",
        value: ">",
        color: 'text-green-700'
    },
];

const TABLE_HEAD = ["ID", "NAME", "IMAGE", "COST", "QUANTITY", "REORDER POINT", "SUPPLIER", "DATE", 'ACTIONS'];

export default function StocksTable({ stocks, setStocks }) {

    const { get, delete: del, put } = useForm();
    const [currentUrl, setCurrentUrl] = useState(route('queryStocks') + "?")
    const [search, setSearch] = useState('');

    const handleFilter = (query, e) => {
        e ? e.preventDefault() : undefined
        if (query.includes('all')) {
            get(route('management'))
            return;
        }
        axios.get(getQueryParameters(currentUrl, query, setCurrentUrl))
            .then(res => setStocks(res.data.stocks))
    }

    const handlePagination = (url) => {
        if (url) {
            const query = new URL(url).search.replace('?', '') + '&';
            axios.get(getQueryParameters(currentUrl, query, setCurrentUrl))
                .then(res => {
                    setStocks(res.data.stocks)
                })
        } else {
            axios.get('')
                .then(res => {
                    console.log(res.data.url)
                    setStocks(res.data.stocks)
                })
        }
    }

    return (
        <Card className="h-full w-full rounded-none">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Manage Stocks
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            Manage all stocks
                        </Typography>
                    </div>
                    {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button className="flex items-center gap-3" color="green" size="sm">
                            <IoMdAdd strokeWidth={2} className="h-4 w-4" color='white' /> Get stocks
                        </Button>
                    </div> */}
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
                        <h2>Quantity: </h2>
                        <Tabs value='none' className="w-full md:w-max bg-blue-gray-100 rounded-md">
                            <TabsHeader>
                                {QUANTITY_TABS.map(({ label, value, color }) => (
                                    <Tab onClick={() => handleFilter(`quantity=${value}&`)} key={label} value={value} className={color}>
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
            <CardBody className="overflow-y-scroll p-0">
                <table className="mt-0 w-full min-w-max table-auto text-left">
                    <thead className='w-full sticky top-0 left-0 bg-blue-gray-100 z-40'>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th key={head} className=" p-4">
                                    <Typography
                                        variant="small"
                                        className="font-bold leading-none opacity-70 text-blue-gray-900"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.length === 0 ? <tr>
                            <td className='p-5 text-blue-gray-500'>No results.</td>
                        </tr> :
                            stocks.data.map((stock, index) => {
                                const isLast = index === stocks.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={stock.id} className='even:bg-blue-gray-50'>
                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {index + 1}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {stock.item_name}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <ViewImage stock={stock} />
                                        </td>

                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                ₱{stock.price}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <div className="w-max" onClick={() => console.log(stock)}>
                                                <Chip
                                                    variant="ghost"
                                                    size="sm"
                                                    value={stock.quantity}
                                                    color={stock.quantity > (stock.reorder_point || 3) ? "green" : "red"}
                                                />
                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {stock.reorder_point}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {stock.supplier.supplier_name}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography variant="small" color="blue-gray" className="font-normal">
                                                {formatDateToCustomFormat(stock.created_at)}
                                            </Typography>
                                        </td>

                                        <td className={classes + ' flex items-center py-6 gap-3'}>
                                            <EditDialog stock={stock} setStocks={setStocks} put={put} />

                                            {stock.quantity !== 1 ? <Tooltip
                                                content="Reduce Quantity"
                                                animate={{
                                                    mount: { scale: 1, y: 0 },
                                                    unmount: { scale: 0, y: 25 },
                                                }}
                                            >
                                                <div>
                                                    <MdRemoveCircleOutline className='hover:text-red-700 cursor-pointer text-2xl p-[2px]' onClick={() => {
                                                        del(route('reduce-stock', stock));
                                                        setStocks(data => {
                                                            data.data = data.data.filter(st => {
                                                                if (st.id === stock.id) {
                                                                    st.quantity -= 1;
                                                                    st.price -= st.original_price;
                                                                }
                                                                return st;
                                                            })
                                                            return data;
                                                        })
                                                    }} />
                                                </div>
                                            </Tooltip> : undefined}
                                            <DeleteDialog del={del} stock={stock} setStocks={setStocks} />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t-2 border-blue-gray-100 p-2 px-5">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page <span className={stocks.current_page > stocks.last_page ? 'text-red-500 font-bold' : undefined}>{stocks.current_page}</span> of {stocks.last_page}
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" disabled={!stocks.prev_page_url} size="sm" onClick={() => handlePagination(stocks.prev_page_url)}>
                        Previous
                    </Button>
                    <Button variant="outlined" disabled={!stocks.next_page_url} size="sm" onClick={() => handlePagination(stocks.next_page_url)}>
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
