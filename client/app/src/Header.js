import { Link } from 'react-router-dom';
import logo from './img/ksuLogo.png';
import styles from './Header.module.css'
import { useUser } from './UserContext';
import {Button } from 'react-bootstrap';

const Header = () => {  
    const { WId, login, logout } = useUser();

    return (
      <header className={styles.headerContainer}>
        <div className={styles.headerTop}>
          <a href="https://ksu.edu">
            <img src={logo} alt="Logo" className={styles.logo} />
          </a>
          <div className={styles.divider}></div>
          <a style={{textDecoration: 'none'}} href="https://cs.ksu.edu">
            <h1 className={styles.headerTitle}>Computer Science</h1>
          </a> 
          <Button
            onClick={WId ? logout : login}
            variant={WId ? 'danger' : 'success'} // Red for logout, green for login
            style={{ marginLeft: 'auto' }}
          >
            {WId ? 'Logout' : 'Login'}
          </Button>
        </div>
        <nav className={styles.navSection}>
          <ul className={styles.navList}>
            <li className={styles.navItemContainer}>
              <Link to="/Home" className={styles.navItem}>CS Applications</Link>
              <div className={styles.dividerNav}></div>
            </li>
            <li className={styles.navItemContainer}>
              <Link to="/Apply" className={styles.navItem}>Apply</Link>
              <div className={styles.dividerNav}></div>
            </li>
            <li className={styles.navItemContainer}>
              <Link to="/Profile" className={styles.navItem}>Profile</Link>
              <div className={styles.dividerNav}></div>
            </li>
            <li className={styles.navItemContainer}>
              <Link to="/AdminPage" className={styles.navItem}>Admin</Link> 
            </li>
            {/*Add more items as needed, header css will auto adjust for the new item*/}
          </ul> 
        </nav>
      </header>
    ); 
}
export default Header;
  