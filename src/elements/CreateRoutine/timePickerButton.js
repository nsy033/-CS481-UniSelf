import React, { useEffect, useState } from 'react';
import './style.css';
import TimePickerModal from './timePickerModal';

function TimePickerButton() {
    const [pickerModalOpen, setPickerModalOpen] = useState(false);

    const showPickerModal = () => {
        setPickerModalOpen(true);
    };

    return (
        <div className='timePickerBox' align="left">
            <b>More than</b>
            <button className='timePickerButton' onClick={showPickerModal}>
                <span>1hr 00min</span>
            </button>
            {pickerModalOpen && <TimePickerModal setPickerModalOpen={setPickerModalOpen} />}
        </div>
    );
}

export default TimePickerButton;