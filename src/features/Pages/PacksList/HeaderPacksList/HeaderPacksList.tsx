import React, {ReactElement} from 'react';
import styles from './headerPacksList.module.scss';
import {AddNewPackModal} from '../../../Modals/AddNewPackModal/AddNewPackModal';

export const HeaderPacksList = (): ReactElement => {

    return (
        <div className={styles.header}>
            <h2>
                Packs List
            </h2>
            <AddNewPackModal/>
        </div>
    )
}