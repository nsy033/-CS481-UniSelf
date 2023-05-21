import React, { useEffect, useState } from 'react';
import './style.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import TimePicker from './timePicker';

function TimePickerModal({ setPickerModalOpen}) {

    const closePickerModal = () => {
        setPickerModalOpen(false);
    };

    return (
    <div className='timePickerModal'>
        <div className='timePicker'>
            <TimePicker value={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
            <span> hour </span>
            <TimePicker value={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]}/>
            <span> minute </span>
        </div>
        <button className='xButton' onClick={closePickerModal}>
            <CheckCircleIcon/>
        </button>
    </div>
    );
}

export default TimePickerModal;