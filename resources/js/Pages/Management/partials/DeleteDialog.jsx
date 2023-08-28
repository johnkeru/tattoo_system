import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    Tooltip,
    Typography
} from "@material-tailwind/react";
import React from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";

export function DeleteDialog({ del, stock, setStocks }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);
    const handleDelete = () => {
        del(route('delete-stock', stock));
        setStocks(data => {
            data.data = data.data.filter(st => st.id !== stock.id)
            return data;
        })
        toast.success('Successfully deleted!')
        handleOpen()
    }

    return (
        <>
            <Tooltip
                content="Delete Stock"
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                }}
            >
                <div>
                    <FiTrash2 className='hover:text-red-700 cursor-pointer text-2xl p-[2px]' onClick={handleOpen} />
                </div>
            </Tooltip>

            <Dialog open={open} handler={handleOpen}>
                <DialogBody divider className="grid place-items-center gap-4">
                    <AiOutlineCloseCircle className="text-7xl text-red-500" />
                    <Typography color="red" variant="h4">
                        Delete {stock.item_name}
                    </Typography>
                    <Typography className="text-center font-normal">
                        By doing this action the {stock.item_name} item will be deleted.
                    </Typography>
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="blue-gray" onClick={handleOpen}>
                        Cancel
                    </Button>
                    <Button color="red" variant="gradient" onClick={handleDelete}>
                        Proceed
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}