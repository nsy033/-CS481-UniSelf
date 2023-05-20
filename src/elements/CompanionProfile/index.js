import './style.css';
import CompanionDeleteModal from '../CompanionDeleteModal';
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

function CompanionProfile(props) {
  const { info, isMe, timezone, requestRemoval, clickable } = props;
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
      {clickable ? (
        <div>
          <Icon
            icon="mdi:user-circle"
            color="#ccc"
            className="userIcon"
            onClick={() => {
              if (clickable) setDeleteModalOpen(true);
            }}
            onMouseEnter={() => {
              if (clickable) setDeleteHover(true);
            }}
            onMouseLeave={() => {
              if (clickable) setDeleteHover(false);
            }}
          />
          <Icon
            icon="mdi:minus-circle"
            color="#fff"
            className="minusIcon"
            onClick={() => {
              if (clickable) setDeleteModalOpen(true);
            }}
            onMouseEnter={() => {
              if (clickable) setDeleteHover(true);
            }}
            onMouseLeave={() => {
              if (clickable) setDeleteHover(false);
            }}
          />
        </div>
      ) : (
        <div>
          <Icon
            icon="mdi:user-circle"
            color={isMe ? timezoneColor : '#ccc'}
            className="userIcon-nonclick"
            onClick={() => {
              if (clickable) setDeleteModalOpen(true);
            }}
            onMouseEnter={() => {
              if (clickable) setDeleteHover(true);
            }}
            onMouseLeave={() => {
              if (clickable) setDeleteHover(false);
            }}
          />
        </div>
      )}
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
