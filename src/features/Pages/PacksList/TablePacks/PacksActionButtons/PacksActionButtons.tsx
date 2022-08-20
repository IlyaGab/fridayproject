import React, {ReactElement, useState} from 'react';
import {faGraduationCap, faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {useAppSelector} from '../../../../../common/hooks/useAppSelector';
import {PackType} from '../../../../../api/packsAPI';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../../common/components/RoutesList/RoutersList';
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch';
import {getCardsListTC, setCardsQueryParamsAC} from '../../../CardsList/cardsListReducer';
import {IconButton} from '../../../../../common/components/IconButton/IconButton';
import {EditPackModal} from '../../../../Modals/PacksModals/EditPackModal';
import {DeletePackModal} from '../../../../Modals/PacksModals/DeletePackModal';

export const PacksActionButtons: React.FC<ActionButtonsPropsType> = ({row}: ActionButtonsPropsType): ReactElement => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const userId = useAppSelector(state => state.profileReducer._id)
    const status = useAppSelector(state => state.appReducer.status)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const deletePackHandler = () => {
        setIsDeleteModalOpen(true)
    }
    const editPackHandler = () => {
        setIsEditModalOpen(true)
    }
    const navigateToLearnHandler = (): void => {
        navigate(PATH.Learn)
        dispatch(setCardsQueryParamsAC({cardsPack_id: row._id}))
        dispatch(getCardsListTC())
    }

    const isMyCards = userId === row.user_id

    return (
        <div>
            {isMyCards &&
                <>
                    <IconButton
                        iconName={faTrashCan}
                        callback={deletePackHandler}
                        disabled={status === 'loading'}
                    />
                    <IconButton
                        iconName={faPencil}
                        callback={editPackHandler}
                        disabled={status === 'loading'}
                    />
                </>
            }
            <IconButton
                iconName={faGraduationCap}
                disabled={row.cardsCount === 0 || status === 'loading'}
                callback={navigateToLearnHandler}
            />
            <DeletePackModal
                isModalOpen={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                row={row}
            />
            <EditPackModal
                isModalOpen={isEditModalOpen}
                setIsModalOpen={setIsEditModalOpen}
                row={row}
            />
        </div>
    )
}

type ActionButtonsPropsType = {
    row: PackType
}