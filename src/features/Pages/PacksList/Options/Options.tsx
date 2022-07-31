import React, {ReactElement} from "react";
import styles from "./options.module.scss";
import {Search} from "./Search/Search";
import {ShowPacksCards} from "./ShowPacksCards/ShowPacksCards";
import {NumberOfCards} from "./NumberOfCards/NumberOfCards";

export const Options = (): ReactElement => {
    return (
        <div className={styles.options}>
            <Search/>
            <ShowPacksCards/>
            <NumberOfCards/>
        </div>
    )
}