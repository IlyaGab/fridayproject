import React, {ReactElement, useState} from 'react';
import {faGraduationCap, faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {useAppSelector} from '../../../../../common/hooks/useAppSelector';
import {PackType} from '../../../../../api/packsAPI';
import {useNavigate} from 'react-router-dom';
import {PATH} from '../../../../../common/components/RoutesList/RoutersList';
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch';
import {getCardsListTC, setCardsQueryParamsAC} from '../../../CardsList/cardsListReducer';
import {IconButton} from '../../../../../common/components/IconButton/IconButton';
import {EditPackModal} from '../../../../Modals/packsModals/EditPackModal';
import {DeletePackModal} from '../../../../Modals/packsModals/DeletePackModal';

export const PacksActionButtons: React.FC<ActionButtonsType> = ({row}: ActionButtonsType): ReactElement => {
    const dispatch = useAppDispatch()

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const navigate = useNavigate()

    const userId = useAppSelector(state => state.profileReducer._id)

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
                        disabled={userId !== row.user_id}
                        callback={deletePackHandler}
                    />
                    <IconButton
                        iconName={faPencil}
                        disabled={userId !== row.user_id}
                        callback={editPackHandler}
                    />
                </>
            }
            <IconButton
                iconName={faGraduationCap}
                disabled={row.cardsCount === 0}
                callback={navigateToLearnHandler}
            />
            <EditPackModal
                isModalOpen={isEditModalOpen}
                setIsModalOpen={setIsEditModalOpen}
                row={row}
            />
            <DeletePackModal
                isModalOpen={isDeleteModalOpen}
                setIsModalOpen={setIsDeleteModalOpen}
                row={row}
            />
        </div>
    )
}

//Types
type ActionButtonsType = {
    row: PackType
}