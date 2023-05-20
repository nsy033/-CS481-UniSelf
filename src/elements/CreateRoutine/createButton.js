import React, { useEffect, useState } from 'react';
import './style.css';
import * as ROUTES from '../../constants/routes';
import CreateModal from './createModal';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

function CreateButton({ id, done, text }) {
    const URLSplit = window.document.URL.split('/');

    // console.log(URLSplit);

    var timezone =
      URLSplit.length >= 5 ? URLSplit[URLSplit.length - 1] : 'morning';
  
    const colorsets = {
      morning: ['#FFCA2D', '#FFE9A9'],
      day: ['#8CD735', '#D8EDC0'],
      night: ['#3F51B5', '#CED3F0'],
    };

    const emptyFilling = {
        opacity: '75%'
    };

    const deepFilling = JSON.parse(JSON.stringify(emptyFilling));
    deepFilling.background = colorsets[timezone][0];
    if (timezone == 'night') {
        deepFilling.color = '#FFFFFF';
    }

    const [modalOpen, setModalOpen] = useState(false);

    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <div className='createBox' align="right">
            <button style={deepFilling} className='createButton' onClick={showModal}>
                <span>Add New Routine</span>
                <KeyboardArrowDownRoundedIcon/>
            </button>
            {modalOpen && <CreateModal setModalOpen={setModalOpen} />}
        </div>
    );
}

export default CreateButton;