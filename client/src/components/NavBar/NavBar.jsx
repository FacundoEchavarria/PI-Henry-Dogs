//Styles
import styles from './NavBar.module.css'
//Library components
import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from '../../multimedia/feliz.png'

const NavBar = () =>{

    const location = useLocation()

    return (
        <nav>
            <div className={styles.logoBox}>
                <Link to='/'><img src={logo} alt="Logo" className={styles.logo}/></Link>
                
            </div>
            <div className={styles.linkBox}>
                <NavLink to={'/home'} ><button className={location.pathname === '/home' ? styles.activeLink : null}>Home</button></NavLink>
                <NavLink to={'/create'}><button className={location.pathname === '/create' ? styles.activeLink : null}>Crear</button></NavLink>
                <NavLink to={'/'}><button>About</button></NavLink>
            </div>
        </nav>
    )
}


export default NavBar;