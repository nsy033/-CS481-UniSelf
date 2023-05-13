import './style.css';
import CompanionDeleteModal from '../CompanionDeleteModal';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

function CompanionProfile(props) {
  const { info, isMe, timezone, requestRemoval } = props;
  const timezoneColor =
    timezone === 'morning'
      ? '#FFCA2D'
      : timezone === 'day'
      ? '#8CD735'
      : '#3F51B5';
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteHover, setDeleteHover] = useState(false);

  const closeDeletemodal = (willRemove) => {
    setDeleteModalOpen(false);
    if (willRemove) requestRemoval(info.name);
  };

  return (
    <div className="profileBox">
      <div>
        <Icon
          icon={deleteHover ? 'mdi:minus-circle' : 'mdi:user-circle'}
          color={isMe ? timezoneColor : '#ccc'}
          className="userIcon"
          onClick={() => setDeleteModalOpen(true)}
          onMouseEnter={() => setDeleteHover(true)}
          onMouseLeave={() => setDeleteHover(false)}
        />
      </div>
      {deleteModalOpen ? (
        <CompanionDeleteModal
          closeDeletemodal={closeDeletemodal}
          header={info.name}
        ></CompanionDeleteModal>
      ) : null}
      {info.name}
    </div>
  );
}

export default CompanionProfile;
