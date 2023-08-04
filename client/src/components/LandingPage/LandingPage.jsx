//Styles
import styles from './LandingPage.module.css'
//Library componets
import { NavLink } from 'react-router-dom'
import {FaPaw} from 'react-icons/fa'



const LandingPage = () => {

    return(
        <div className={styles.landingPage}>
            <div className={styles.enterBox}>
                <h1 className={styles.title}>Dogs</h1>
                <NavLink vLink to={'/home'} className={styles.enterButtonBox}><FaPaw className={styles.enterButton}></FaPaw></NavLink>
            </div>
        </div>
    )
}

export default LandingPage