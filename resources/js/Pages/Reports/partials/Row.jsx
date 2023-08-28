import { formatDateToCustomFormat } from '@/Utils/dateconverter';
import { Chip, Typography } from '@material-tailwind/react';
import React from 'react'

const Row = ({ report, classes }) => {
    const data = JSON.parse(report.report_data);
    return (
        <>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-bold">
                    {report.report_name}
                </Typography>
            </td>
            <td className={classes}>
                <div className="w-max">
                    <Chip
                        variant="ghost"
                        size="sm"
                        value={report.status}
                        color={report.status === 'new' ? "green" : "blue-gray"}
                    />
                </div>
            </td>
            <td className={classes}>
                <div className="flex flex-col">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        {data.message}
                    </Typography>
                    <Chip
                        variant="ghost"
                        size="sm"
                        value={data.type}
                        color={data.type === 'delete' ? "red" : data.type === 'update' ? "blue" : data.type === 'add' ? 'green' : 'blue-gray'}
                    />
                </div>
            </td>
            <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                    {formatDateToCustomFormat(report.report_date)}
                </Typography>
            </td>
        </>
    )
}

export default Row