import React from "react";
//components
import CreateDog from "../CreateDog/CreateDog";
import EditList from "../CreateDog/EditList/EditList";
//styles
import styles from './CreatePage.module.css'


const CreatePage = () => {

    return(
        <div className={styles.createPageBox}>
            <EditList/>
            <CreateDog/>
        </div>
    )
}

export default CreatePage;