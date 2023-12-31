import React, { useEffect } from "react";
import CreateDog from "../CreateDog/CreateDog";
import { useDispatch, useSelector } from "react-redux";
import { editDog } from "../../redux/actions";
import styles from './EditDog.module.css'


const EditDog = () => {

    const dogToEdit = useSelector((state) => state.dogToEdit)
    const dispatch = useDispatch()

    useEffect(()=>{
        return () => {
            dispatch(editDog(null))
        }
    }, [dispatch])

    return (
        <div className={styles.editDogBox}>
            <h1 className={styles.title}>Edit your <span>Dog</span></h1>
            <CreateDog
            dog = {dogToEdit}
            />
        </div>
    )
}

export default EditDog;