//Styles
import styles from './LandingPage.module.css'
//Library componets
import { NavLink } from 'react-router-dom'
import pawIcon from '../../multimedia/paw-solid.svg'



const LandingPage = () => {

    return(
        <div className={styles.landingPage}>
            <div className={styles.enterBox}>
                <h1 className={styles.title}>Dogs</h1>
                <NavLink to={'/home'} className={styles.enterButtonBox}>
                    <img src={pawIcon} alt='logo' className={styles.enterButton}/>
                </NavLink>
            </div>
        </div>
    )
}

export default LandingPage