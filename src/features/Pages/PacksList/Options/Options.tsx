import React from "react";
import styles from "./options.module.scss";

export const Options = () => {
    return (
        <div className={styles.options}>
            <div className={styles.search}>
                <h3>
                    Search
                </h3>
            </div>
            <div className={styles.showPacksCards}>
                <h3>
                    Show packs cards
                </h3>
            </div>
            <div className={styles.numberOfCards}>
                <h3>
                    Number of cards
                </h3>
            </div>
        </div>
    )
}