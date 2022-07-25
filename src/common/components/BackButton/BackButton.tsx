import React from 'react';
import styles from "./backButton.module.scss"
import {faArrowLeftLong} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const BackButton = () => {
    return (
        <button className={styles.back}>
            <FontAwesomeIcon icon={faArrowLeftLong} size="lg"/> <span>Back to Packs List</span>
        </button>
    );
};
