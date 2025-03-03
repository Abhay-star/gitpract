'use client'
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Dropdown from '@/components/Dropdown';
import Divider from '@mui/material/Divider';

// table import
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// alert
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import { closestCorners, DndContext } from '@dnd-kit/core';
import Column from './../../components/Column';
import { arrayMove } from '@dnd-kit/sortable';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function page() {
    const table = [
        { id: 1, title: 'title1', },
        { id: 2, title: 'title2', },
        { id: 3, title: 'title3', },
        { id: 4, title: 'title4', },
        { id: 5, title: 'title5', },
    ]

    const [tableData, setTableData] = useState([...table]);

    const [task, setTask] = useState([...table]);

    const [disabletask, setDisabletask] = useState([
        { id: 6, title: 'title6', },
        { id: 7, title: 'title7', },
        { id: 8, title: 'title8', },
        { id: 9, title: 'title9', },
        { id: 10, title: 'title10', },
    ]
    )

    const tempDisableList = [...disabletask];
    const tempTaskList = [...task];

    const [alert, setalert] = useState(false);

    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getTaskPos = id => task.findIndex(task => task.id == id)
    const handleDragEnd = event => {
        const { active, over } = event;
        if (active.id == over.id) return;
        setTask(task => {
            const originalPos = getTaskPos(active.id);
            const newpos = getTaskPos(over.id);
            return arrayMove(task, originalPos, newpos)
        })
    }


    function addListToTask(data) {
        handleDisableList(data);
    }

    function handleDisableList(data) {
        data.forEach(element => {
            let indexval = tempDisableList.findIndex(x => x.id == element.id);
            if (indexval != -1) {
                tempDisableList.splice(indexval, 1);
            }
        });
        setDisabletask(tempDisableList);
        setTask([...task, ...data]);

    }

    function handleClickRemoveTaskList(data) {
        console.log(data)
        let indexval = tempTaskList.findIndex(x => x.id == data.id);
        if (indexval != -1) {
            tempTaskList.splice(indexval, 1);
        }
        console.log(tempTaskList);
        setTask([...tempTaskList]);
        setDisabletask([...tempDisableList, data]);
    }


    function submit() {
        setTableData(task);
        handleClose();
        setalert(true)
        setTimeout(() => {
            setalert(false)
        }, 2000);

    }


    return (

        <>
            {alert && (<Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Here is a gentle confirmation that your action was successful.
            </Alert>)}

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
                        <Column tasks={task} removeTaskList={handleClickRemoveTaskList} />
                    </DndContext>
                    <div style={{ padding: '16px' }}>
                        <Dropdown dropdownList={disabletask} list={addListToTask}></Dropdown>
                    </div>
                    <Divider component="div" />
                    <Stack spacing={2} justifyContent={'flex-end'} direction="row" sx={{ paddingX: 4, paddingY: 2 }}>
                        <Button variant="contained" onClick={submit}>submit</Button>
                        <Button variant="outlined" color="error" onClick={() => setOpen(false)}>close</Button>
                    </Stack>
                </Box>
            </Modal>


            {/* modal end */}
            <Stack
                direction="row"
                spacing={2}
                bgcolor={'#d3d3d3'}
                p={3}
                justifyContent={'flex-end'}
            >
                <Button variant="contained" onClick={handleOpen}>open modal</Button>
            </Stack>


            {/* modal */}

            {/* table */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {tableData?.map(item => (
                                <TableCell>{item.title}</TableCell>
                            ))}

                            <TableCell align="right">Calories</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.title}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


        </>);
}

export default page;