import React from 'react';
import styles from './Footer.module.css'; 
import footerImage from './img/Footer2.jpg'; 

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={footerImage} alt="Footer Background" className={styles.footerImg} />
      <div className={styles.footerContent}>
        <p>Department of Computer Science<br />
        2184 Engineering Hall</p>

        <p>1701D Platt St., Manhattan, KS 66506</p>

        <p>785-532-6350 | 785-532-7353 fax | csoffice@k-state.edu</p>

        <p>Monday – Friday<br />
        8 a.m. – noon<br />
        1 p.m. – 5 p.m</p>
      </div>
    </footer>
  );
}

export default Footer;
