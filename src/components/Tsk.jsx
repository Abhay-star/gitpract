'use client'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities"
import CloseIcon from '@mui/icons-material/Close';
import { Button, Stack } from "@mui/material";

function Tsk({ id, title, removeTaskList }) {
 

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        flex:'auto',

    }
    return (
        <>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{borderBottom:'1px solid #d3d3d3', padding:'16px'}}>
            <div style={style} ref={setNodeRef} {...attributes} {...listeners} id={id}>{title} </div>
            <Button className="btn btn-primary" onClick={() => removeTaskList({'id':id, 'title':title})}><CloseIcon fontSize="medium" ></CloseIcon></Button>
            </Stack>
        </>
    );
}

export default Tsk;