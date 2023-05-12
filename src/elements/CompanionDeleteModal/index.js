import './style.css';
import React from 'react';

export default function CompanionDeleteModal(props) {
  const { closeDeletemodal, header } = props;
  return (
    <div className="openModal modal">
      <section>
        <main>
          Will you really remove <b>{header}</b> from your companion list?
        </main>
        <footer>
          <button className="remove" onClick={() => closeDeletemodal(true)}>
            REMOVE
          </button>
          <button className="close" onClick={() => closeDeletemodal(false)}>
            CLOSE
          </button>
        </footer>
      </section>
    </div>
  );
}
