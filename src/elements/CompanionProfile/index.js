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

  const closeDeletemodal = (willRemove) => {
    setDeleteModalOpen(false);
    if (willRemove) requestRemoval(info.name);
  };

  return (
    <div className="profileBox">
      {clickable ? (
        <div
          className="clickable-profile"
          onClick={() => {
            if (clickable) setDeleteModalOpen(true);
          }}
        >
          <div className="userIcon">
            <Icon
              icon="mdi:user-circle"
              color="#ccc"
              width={'40px'}
              height={'40px'}
            />
          </div>
          <div className="minusIcon">
            <Icon
              icon="mdi:minus-circle"
              color="#fff"
              width={'32px'}
              height={'32px'}
            />
          </div>
          {info.name}
        </div>
      ) : (
        <div className="nonclickable-profile">
          <Icon
            icon="mdi:user-circle"
            color={isMe ? timezoneColor : '#ccc'}
            className="userIcon-nonclick"
          />
          {info.name}
        </div>
      )}
      {deleteModalOpen ? (
        <CompanionDeleteModal
          closeDeletemodal={closeDeletemodal}
          header={info.name}
        ></CompanionDeleteModal>
      ) : null}
    </div>
  );
}

export default CompanionProfile;
