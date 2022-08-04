import React from "react";
import styles from "./menu.module.scss"

export const Menu = () => {
    return (
        <div className={styles.menu}>
            <div className={styles.menuContainer}>
                <button className={styles.btn}>Edit</button>
                <button className={styles.btn}>Delete</button>
            </div>
        </div>
    )
}