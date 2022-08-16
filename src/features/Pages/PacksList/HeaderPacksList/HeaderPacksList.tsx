import React, {ReactElement} from 'react';
import styles from './headerPacksList.module.scss';
import {AddButton} from '../../../../common/components/AddButton/AddButton';

type PropsType = {
    setIsModalOpen: (value: boolean) => void
}

export const HeaderPacksList: React.FC<PropsType> = ({setIsModalOpen}): ReactElement => {
    const handleClick = () => {
        setIsModalOpen(true)
    }

    return (
        <div className={styles.header}>
            <h2>
                Packs List
            </h2>
            <AddButton name={'Add new pack'} callback={handleClick}/>
        </div>
    )
}