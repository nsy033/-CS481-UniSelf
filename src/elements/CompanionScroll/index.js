import './style.css';
import React, { useEffect, useState, useRef } from 'react';
import CompanionProfile from '../CompanionProfile';

function CompanionScroll(props) {
  const list = props.list;
  const scrollBox = useRef();

  const onWheel = (e) => {
    const box = scrollBox.current;

    if (box) {
      //   console.log(
      //     scrollBox.current.scrollTop,
      //     scrollBox.current.scrollWidth,
      //     scrollBox.current.scrollLeft,
      //     scrollBox.current.clientWidth + scrollBox.current.scrollLeft
      //   );

      if (e.deltaY === 0) return;

      box.scrollBy({
        left: e.deltaY < 0 ? -30 : 30,
      });
    }
  };

  /*
    const getVisibleSides = () => {
        const box = scrollBox.current;

        if (box) {
        const isTop = box.scrollLeft === 0;
        const isBottom = box.scrollWidth === box.clientWidth + box.scrollLeft;
        const isBetween = !isTop && !isBottom;

        return {
            top: (isBottom || isBetween) && !(isTop && isBottom),
            bottom: (isTop || isBetween) && !(isTop && isBottom),
        };
        } else
        return {
            top: false,
            bottom: false,
        };
    };
  */

  return (
    <div className="horizontalScroll" ref={scrollBox} onWheel={onWheel}>
      {list
        .filter((companion) => companion['name'] !== 'Me')
        .map((companion) => (
          <CompanionProfile
            info={companion}
            isMe={false}
            key={companion.name}
          />
        ))}
    </div>
  );
}

export default CompanionScroll;
