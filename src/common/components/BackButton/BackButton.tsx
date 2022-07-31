import React from 'react';
import styles from "./backButton.module.scss"
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {PATH} from "../RoutesList/RoutersList";

export const BackButton = () => {
    const navigate = useNavigate()

    const onClickHandler = () => {
        navigate(PATH.PacksList)
    }
    return (
        <button className={styles.back} onClick={onClickHandler}>
            <FontAwesomeIcon icon={faArrowLeftLong} size="lg"/> <span>Back to Packs List</span>
        </button>
    );
};
