import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Tooltip,
    Typography,
} from "@material-tailwind/react";
import React from "react";
import { AiOutlineClose, AiOutlineMail } from "react-icons/ai";
import { FcViewDetails } from 'react-icons/fc';
import { BiSolidFactory } from "react-icons/bi";
import { BsTelephoneFill } from "react-icons/bs";

export function ViewStock({ stock }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <>
            <Tooltip
                content={"View Details"}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                }}
            >
                <div>
                    <FcViewDetails className='hover:text-light-blue-700 cursor-pointer text-2xl' onClick={handleOpen} />
                </div>
            </Tooltip>

            <Dialog open={open} handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader>{stock.item_name}</DialogHeader>
                    <AiOutlineClose onClick={handleOpen} className="hover:text-red-500 mr-5 h-5 w-5 cursor-pointer" />
                </div>
                <DialogBody divider className="overflow-y-scroll h-[75vh]">
                    <div className="grid gap-6">
                        <img src={stock.image} className="m-auto" />
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Supplier details:</h2>
                            <div className="flex items-center gap-2">
                                <BiSolidFactory />
                                <p>{stock.supplier.supplier_name}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <AiOutlineMail />
                                <p>{stock.supplier.email}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <BsTelephoneFill />
                                <p>{stock.supplier.phone}</p>
                            </div>
                        </div>
                        <Typography className="font-normal">
                            {stock.description}
                        </Typography>
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleOpen}>
                        close
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

