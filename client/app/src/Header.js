import { Link } from 'react-router-dom';
import logo from './img/ksuLogo.png';
import styles from './Header.module.css'
const Header = () => {  
  
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
        </div>
        <nav className={styles.navSection}>
          <ul className={styles.navList}>
            <li><Link to="/Home" className={styles.navItem}>CS Applications</Link></li>
            <li><Link to="/Apply" className={styles.navItem}>Apply</Link></li>
            <li><Link to="/Profile" className={styles.navItem}>Profile</Link></li>
          </ul>
        </nav>
      </header>
    ); 
}
export default Header;
  