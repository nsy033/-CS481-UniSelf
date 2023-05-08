import './style.css';
import * as ROUTES from '../../constants/routes';

function Navbar() {
  const URLSplit = window.document.URL.split('/');
  const curPage = URLSplit[URLSplit.length - 1];
  const potentialTimezone = URLSplit[URLSplit.length - 2];

  let selectedType = 1;
  if (curPage === 'morning' || potentialTimezone === 'morning')
    selectedType = 2;
  else if (curPage === 'day' || potentialTimezone === 'day') selectedType = 3;
  else if (curPage === 'night' || potentialTimezone === 'night')
    selectedType = 4;
  else if (curPage === 'companion') selectedType = 5;

  return (
    <div className="Navbar">
      <header className="NavbarHeader">
        <div className="Logo">UniSelf</div>
        <ul className="Navlinks">
          <li>
            <a
              href={ROUTES.MAIN}
              className={selectedType === 1 ? 'selected' : 'unselected'}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href={ROUTES.SUB + '/morning'}
              className={selectedType === 2 ? 'selected' : 'unselected'}
            >
              Morning
            </a>
          </li>
          <li>
            <a
              href={ROUTES.SUB + '/day'}
              className={selectedType === 3 ? 'selected' : 'unselected'}
            >
              Day
            </a>
          </li>
          <li>
            <a
              href={ROUTES.SUB + '/night'}
              className={selectedType === 4 ? 'selected' : 'unselected'}
            >
              Night
            </a>
          </li>
          <li>
            <a
              href={ROUTES.COMPANION}
              className={selectedType === 5 ? 'selected' : 'unselected'}
            >
              Companion
            </a>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Navbar;
