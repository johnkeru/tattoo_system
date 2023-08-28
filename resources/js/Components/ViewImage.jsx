import {
    Button,
    Card,
    Dialog,
    DialogBody,
    DialogHeader,
    Typography
} from "@material-tailwind/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export function ViewImage({ stock }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <>
            <img
                onClick={handleOpen}
                alt="nature"
                className="w-[40px] h-[40px] object-cover object-center cursor-pointer rounded-md"
                src={stock.image}
            />
            <Dialog size="xl" open={open} handler={handleOpen}>
                <DialogHeader className="justify-between">
                    {stock.item_name}
                    <div className="flex items-center gap-2">
                        {/* <Button color="green" size="sm">
                            Free Download
                        </Button> */}
                        <Button color="red" size="sm" onClick={handleOpen}>
                            Close
                        </Button>
                    </div>
                </DialogHeader>
                <DialogBody divider={true} className="p-0 overflow-y-scroll h-[80vh]">
                    <img
                        alt={stock.item_name}
                        className="h-[48rem] w-full object-cover object-center"
                        src={stock.image}
                    />
                </DialogBody>
            </Dialog>
        </>
    );
}