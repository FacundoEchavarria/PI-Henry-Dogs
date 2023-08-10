import React from "react";
//styles
import styles from './Footer.module.css'

const Footer = () => {

    return (
        <footer>
            <h2><span className={styles.footerText}>Project by </span><span className={styles.footerName}>Facundo Echavarria</span></h2>
        </footer>
    )
}

export default Footer