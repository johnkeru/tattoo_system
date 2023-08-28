import { formatDateToCustomFormat } from "@/Utils/dateconverter";
import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Product", "Supplier", "Phone", "Date"];

export function DashboardTable({ stocks }) {
    return (
        <Card className="h-[52vh] w-full overflow-y-scroll rounded-none">
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography
                                    variant="small"
                                    className="leading-none opacity-70 text-gray-900 font-bold"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((st, index) => {
                        const isLast = index === stocks.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                        return (
                            <tr key={st.id}>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal flex items-center gap-3">
                                        <img src={st.image} className='w-[40px] h-[40px] rounded-full' />
                                        {st.item_name}
                                    </Typography>
                                </td>
                                <td className={`${classes} bg-blue-gray-50/50`}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {st.supplier.supplier_name}
                                    </Typography>
                                </td>
                                <td className={classes}>
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {st.supplier.phone}
                                    </Typography>
                                </td>
                                <td className={`${classes} bg-blue-gray-50/50`}>
                                    <Typography variant="small" color="blue-gray" className="font-medium">
                                        {formatDateToCustomFormat(st.supplier.created_at)}
                                    </Typography>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Card>
    );
}