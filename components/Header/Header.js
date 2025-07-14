import Navbottom from '../Nav/Nav-Links/NavLinks';
import Navtop from '../Nav/Container/Container';
import './Header.css';

const Header = ({ isAuthenticated, logout }) => {
  return (
    <div className="header__container">
      <Navtop />
      <Navbottom />
      {isAuthenticated && (
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      )}
    </div>
  );
};

export default Header;
