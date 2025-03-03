'use client'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';

function Dropdown({ dropdownList, list }) {
    let temparray = [];
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelection = (item) => {
        if (temparray.length == 0) {
            temparray.push(item);
        }
        else {
            let index = temparray.findIndex(x => x.id == item.id);
            if (index != -1) {
                temparray.splice(index, 1);
            }
            else {
                temparray.push(item);
            }
        }
    }


    function handleAdd() {
        list(temparray);
        handleClose();
    }


    return (
        <>
            <div>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    Show non-displayed columns
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <div className="" style={{ width: '500px' }}>
                        {dropdownList.map(item => (
                            <MenuItem key={item.id}> <Checkbox aria-label='Checkbox demo' onChange={() => handleSelection(item)} /> {item.title}</MenuItem>
                        ))}
                        <Divider component="div" />
                        <Stack spacing={2} direction="row" sx={{ paddingX: 4 }} justifyContent={'flex-end'}>
                            <Button variant="contained" onClick={handleAdd}>add</Button>
                            <Button variant="outlined" color="error" onClick={handleClose}>reset</Button>
                        </Stack>
                    </div>
                </Menu>
            </div>
        </>
    );
}

export default Dropdown;