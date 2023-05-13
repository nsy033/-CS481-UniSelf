import React, { useEffect, useState } from 'react';
import './style.css';
import TimePickerModal from './timePickerModal';

function  TimePickerButton() {
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <div className='timePickerBox' align="left">
            <b>More than</b>
            <button className='timePickerButton' onClick={showModal}>
                1hr 00min
            </button>
            {/* {modalOpen && <TimePickerModal setModalOpen={setModalOpen} />} */}
        </div>
    );
}

export default TimePickerButton;