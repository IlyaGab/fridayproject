import React, {ReactElement} from 'react';
import styles from './headerPacksList.module.scss';
import {AddButton} from '../../../../common/components/AddButton/AddButton';
import {useAppSelector} from '../../../../common/hooks/useAppSelector';

export const HeaderPacksList: React.FC<PropsType> = ({setIsModalOpen}): ReactElement => {
    const status = useAppSelector(state => state.appReducer.status)
    const handleClick = () => {
        setIsModalOpen(true)
    }

    return (
        <div className={styles.header}>
            <h2>
                Packs List
            </h2>
            <AddButton name={'Add new pack'} callback={handleClick} disabled={status === 'loading'}/>
        </div>
    )
}

type PropsType = {
    setIsModalOpen: (value: boolean) => void
}
