import React, { useEffect, useState } from 'react';
import './style.css';
import CreateModal from './createModal';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Icon } from '@iconify/react';

function CreateButton({ id, done, text }) {
    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <div className='createBox' align="right">
            <button className='createButton' onClick={showModal}>
                <span>Add New Routine</span>
                <KeyboardArrowDownRoundedIcon/>
            </button>
            {modalOpen && <CreateModal setModalOpen={setModalOpen} />}
        </div>
    );
}

export default CreateButton;