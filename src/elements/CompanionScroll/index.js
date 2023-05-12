import './style.css';
import React, { useEffect, useState, useRef } from 'react';
import CompanionProfile from '../CompanionProfile';

function CompanionScroll(props) {
  const { list, updateCompanionList } = props;
  const scrollBox = useRef();

  const onWheel = (e) => {
    const box = scrollBox.current;
    if (box) {
      if (e.deltaY === 0) return;
      box.scrollBy({
        left: e.deltaY < 0 ? -30 : 30,
      });
    }
  };
  const removeRequested = (name2Remove) => {
    const newList = list
      .filter(({ name }) => name !== name2Remove)
      .map(({ name }) => {
        return name;
      });
    updateCompanionList(newList);
  };

  return (
    <div className="horizontalScroll" ref={scrollBox} onWheel={onWheel}>
      {list
        .filter((companion) => companion['name'] !== 'Me')
        .map((companion) => (
          <CompanionProfile
            info={companion}
            isMe={false}
            key={companion.name}
            requestRemoval={removeRequested}
          />
        ))}
    </div>
  );
}

export default CompanionScroll;
