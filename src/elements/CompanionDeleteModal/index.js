import './style.css';
import React from 'react';

export default function CompanionDeleteModal(props) {
  const { closeDeletemodal, header } = props;
  return (
    <div className="openModal modal">
      <section>
        <main>
          Will you really remove <b>{header}</b> from your
          <br />
          companion list?
          <button
            onClick={() => closeDeletemodal(false)}
            className="closeXButtonRemove"
          >
            &times;
          </button>
        </main>
        <footer>
          <button className="remove" onClick={() => closeDeletemodal(true)}>
            REMOVE
          </button>
        </footer>
      </section>
    </div>
  );
}
