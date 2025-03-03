'use client'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Stack } from '@mui/material';
import Tsk from './Tsk';

function Column({ tasks, removeTaskList }) {
    // function taskClick(data){
    //     console.log("ddd", data)
    // }
    return (<>
        <Stack direction={'Column'} spacing={5} sx={{ width: '100%', bgcolor: '#f1f1ed', padding: '16px' }}>
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks.map((item) => (
                    //    <Task id={item?.id} title={id.title} key={item.id}></Task>
                    <Tsk id={item.id} title={item.title} key={item.id} removeTaskList={removeTaskList}></Tsk>
                    ))}
            </SortableContext>
        </Stack>
    </>);
}

export default Column;