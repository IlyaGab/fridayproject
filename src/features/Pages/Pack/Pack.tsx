import React from "react";
import styles from "./pack.module.scss"
import {BackButton} from "../../../common/components/BackButton/BackButton";

export const Pack = () => {
    return (
        <div className={styles.pack}>
            <div className={styles.container}>
                <BackButton />
                <h2>
                    Name Pack
                </h2>
            </div>
        </div>
    )
}