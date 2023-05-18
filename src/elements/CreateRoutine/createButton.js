import React, { useEffect, useState } from 'react';
import './style.css';
import CreateModal from './createModal';

function CreateButton({ id, done, text }) {

//   return (
//     <div>
//         <button>Add New Routine</button>
//     </div>
    
    
//   );
    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    return (
        <div className='createBox' align="right">
            <button className='createButton' onClick={showModal}>Add New Routine</button>
            {modalOpen && <CreateModal setModalOpen={setModalOpen} />}
        </div>
    );
}

export default CreateButton;