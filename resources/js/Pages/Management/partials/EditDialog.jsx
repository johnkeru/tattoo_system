import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Tooltip,
} from "@material-tailwind/react";
import { LuEdit } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";

export function EditDialog({ stock, setStocks, put }) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    const handleUpdate = () => {
        put(route('update-stock', { item_name, reorder_point, reorder_quantity, stock: stock.id }));
        setStocks(data => {
            data.data = data.data.filter(st => {
                if (st.id === stock.id) {
                    st.item_name = item_name;
                    st.reorder_point = reorder_point;
                    st.reorder_quantity = reorder_point;
                    // st.image = image;
                }
                return st;
            })
            return data;
        })
        handleOpen();
    }

    const [item_name, setItemName] = useState(stock.item_name);
    const [image, setImage] = useState(stock.image);
    const [reorder_point, setReorderPoint] = useState(stock.reorder_point);
    const [reorder_quantity, setReorderQuantity] = useState(stock.reorder_quantity);

    return (
        <>
            <Tooltip
                content="Edit Stock"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                }}
            >
                <div>
                    <LuEdit className='hover:text-light-blue-700 cursor-pointer text-2xl p-[2px]' onClick={handleOpen} />
                </div>
            </Tooltip>

            <Dialog open={open} handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader>Edit {stock.item_name}</DialogHeader>
                    <AiOutlineClose onClick={handleOpen} className="hover:text-red-500 mr-5 h-5 w-5 cursor-pointer" />
                </div>
                <DialogBody divider>
                    <div className="grid gap-6">

                        <img src={stock.image} className="h-96 m-auto" />

                        <div className="flex gap-3">
                            <h3>Cost: ₱{stock.price}</h3>
                            <h3>Original Price: ₱{stock.original_price}</h3>
                            <h3>Quantity: {stock.quantity}</h3>
                        </div>

                        <Input label="Name" onChange={val => setItemName(val.target.value)} value={item_name} />


                        <div className="flex gap-3">
                            <Input type="number" label="Re-order point" onChange={val => setReorderPoint(val.target.value)} value={reorder_point} />
                            <Input type="number" label="Re-order quantity" value={reorder_quantity} onChange={val => setReorderQuantity(val.target.value)} />
                        </div>
                    </div>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="outlined" color="red" onClick={handleOpen}>
                        close
                    </Button>
                    <Button variant="gradient" color="blue" onClick={handleUpdate}>
                        update {stock.item_name}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

