import { Link, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';
import styles from './Navbar.module.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = Auth.loggedIn();

  const handleLogout = () => {
    Auth.logout();
    navigate('/login');
  };

  return (
    <div className={styles.nav}>
      <div className={styles['nav-title']}>
        <Link to='/'>Krazy Kanban Board</Link>
      </div>
      <ul className={styles['nav-items']}>
        {isLoggedIn && (
          <li className={styles['nav-item']}>
            <Link to='/create'>Create Ticket</Link>
          </li>
        )}
        <li className={styles['nav-item']}>
          {!isLoggedIn ? (
            <Link to='/login' className={styles['nav-button']}>Login</Link>
          ) : (
            <button 
              type='button' 
              onClick={handleLogout}
              className={styles['nav-button']}
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
