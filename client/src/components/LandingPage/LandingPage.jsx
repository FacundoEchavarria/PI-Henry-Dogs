//Styles
import styles from './LandingPage.module.css'
//Library componets
import { NavLink } from 'react-router-dom'



const LandingPage = () => {

    return(
        <div className={styles.LandingPage}>
            <h1>Landing Page</h1>
            <NavLink to={'/home'}><button>Entrar</button></NavLink>
        </div>
    )
}

export default LandingPage