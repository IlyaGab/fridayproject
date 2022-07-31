import React, {ReactElement} from "react";
import styles from "./numberOfCards.module.scss";

export const NumberOfCards = (): ReactElement => {
    return (
        <div className={styles.numberOfCards}>
            <h3>
                Number of cards
            </h3>
            ...
        </div>
    )
}