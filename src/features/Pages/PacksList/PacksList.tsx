import React, {ReactElement} from "react";
import styles from "./packsList.module.scss"
import {Options} from "./Options/Options";
import {TablePacks} from "./TablePacks/TablePacks";
import {Pagination} from "./Pagination/Pagination";
import {HeaderPacksList} from "./HeaderPacksList/HeaderPacksList";

export const PacksList = (): ReactElement => {
    return (
        <div className={styles.packsListPage}>
            <div className={styles.container}>
                <HeaderPacksList/>
                <Options/>
                <TablePacks/>
                <Pagination/>
            </div>
        </div>
    )
}