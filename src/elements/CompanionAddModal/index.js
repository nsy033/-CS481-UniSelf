import './style.css';
import React, { useState, useEffect } from 'react';
import CompanionSearchUnit from '../CompanionSearchUnit';

export default function CompanionAddModal(props) {
  const {
    closeAddmodal,
    timezoneColor,
    allUsers,
    companionList,
    updateCompanionList,
  } = props;
  const [searchInput, setSearchInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const newSearchResult = allUsers
      .map(({ name }) => name)
      .filter(
        (userName) =>
          userName.toLowerCase().includes(searchInput.toLowerCase()) &&
          searchInput !== ''
      )
      .sort();
    setSearchResults(newSearchResult);
    setSelectedUser('');
  }, [searchInput]);

  const selectUser = (name) => {
    setSelectedUser(name);
  };
  const addCompanion = () => {
    const companionNames = companionList.map(({ name }) => name);
    const newList = allUsers.filter((user) => {
      if (companionNames.includes(user.name) || user.name === selectedUser)
        return true;
      else return false;
    });
    updateCompanionList(newList);
    closeAddmodal();
  };

  return (
    <div className="openModal modal">
      <section>
        <header>
          New Routine Companion
          <button onClick={() => closeAddmodal()} className="closeXButton">
            &times;
          </button>
        </header>
        <main>
          <input
            type="text"
            className="search-box"
            name="search-box"
            size="25"
            placeholder="🔍   Enter the user's nickname you want to find"
            onChange={(e) => setSearchInput(e.target.value)}
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
            {searchResults.length === 0 ? (
              <div className="searched-results">None</div>
            ) : (
              searchResults.map((user) => (
                <CompanionSearchUnit
                  name={user}
                  key={user}
                  selectUser={selectUser}
                  isSelected={selectedUser === user}
                />
              ))
            )}
          </div>
        </main>
        <footer>
          <button
            className="btnInAddModal"
            onClick={() => addCompanion()}
            style={{
              background:
                selectedUser === '' ? '#c9c9c9' : timezoneColor.background,
            }}
            disabled={selectedUser === '' ? 'disabled' : ''}
          >
            ADD
          </button>
        </footer>
      </section>
    </div>
  );
}
