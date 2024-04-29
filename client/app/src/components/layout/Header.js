import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../img/ksuLogo.png';
import styles from '../../styles/Header.module.css'
import { useUser  } from '../../context/UserContext';
import {Button } from 'react-bootstrap';

const Header = () => {  
    const { logout, login,userData } = useUser();
    const isAuthenticated = !!userData.wid;

    const showAdminLink = userData.wid && userData.isAdmin;

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerTop}>
                <a href="https://ksu.edu">
                    <img src={logo} alt="Logo" className={styles.logo} />
                </a>
                <div className={styles.divider}></div>
                <a style={{ textDecoration: 'none' }} href="https://cs.ksu.edu">
                    <h1 className={styles.headerTitle}>Computer Science</h1>
                </a>
                <Button
                    onClick={isAuthenticated ? logout : login}
                    variant={isAuthenticated ? 'danger' : 'success'}
                    style={{ marginLeft: 'auto' }}
                >
                    {isAuthenticated ? 'Logout' : 'Login'}
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
                    </li>
                    {showAdminLink && (
                        <li className={styles.navItemContainer}>
                            <div className={styles.dividerNav}></div>
                            <Link to="/AdminPage" className={styles.navItem}>Admin</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}
export default Header;
  