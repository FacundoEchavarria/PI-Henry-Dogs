import React from "react";
//components
import CreateDog from "../CreateDog/CreateDog";
import EditList from "../CreateDog/EditList/EditList";
//styles
import styles from './CreatePage.module.css'


const CreatePage = () => {

    return(
        <div className={styles.createPageBox}>
            <h2>My <span>Dogs</span></h2>
            <EditList/>
            <h2>Create your own <span>Dog</span></h2>
            <CreateDog/>
        </div>
    )
}

export default CreatePage;