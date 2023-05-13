import './style.css';
import React from 'react';

export default function CompanionAddModal(props) {
  const { closeAddmodal, timezoneColor } = props;
  return (
    <div className="openModal modal">
      <section>
        <header>New Routine Companion</header>
        <main>
          <input
            type="text"
            className="search-box"
            name="search-box"
            size="25"
            placeholder="🔍   Enter the user's nickname you want to find"
          />
          <div className="searched-area">
            <div className="searched-area-title">Searched users</div>
            <div
              style={{
                width: '100%',
                textAlign: 'center',
                borderBottom: '1px solid #ccc',
                lineHeight: '0.1em',
                margin: '7px 0',
              }}
            />
            <div className="searched-results">None</div>
          </div>
        </main>
        <footer>
          <button
            className="add"
            onClick={() => closeAddmodal(true)}
            style={{ background: timezoneColor.background }}
          >
            ADD
          </button>
          <button className="close" onClick={() => closeAddmodal(false)}>
            CLOSE
          </button>
        </footer>
      </section>
    </div>
  );
}
