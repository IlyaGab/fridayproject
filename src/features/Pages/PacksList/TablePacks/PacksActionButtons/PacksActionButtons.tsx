import React, {ReactElement, useState} from 'react'

import {faGraduationCap, faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'

import {PackType} from '../../../../../api/packsAPI'
import {CustomIconButton} from '../../../../../common/components/CustomIconButton/CustomIconButton'
import {PATH} from '../../../../../common/components/RoutesList/RoutersList'
import {useAppDispatch} from '../../../../../common/hooks/useAppDispatch'
import {useAppSelector} from '../../../../../common/hooks/useAppSelector'
import {DeletePackModal} from '../../../../Modals/PacksModals/DeletePackModal'
import {EditPackModal} from '../../../../Modals/PacksModals/EditPackModal'
import {getCardsListTC, setCardsQueryParamsAC} from '../../../CardsList/cardsListReducer'

export const PacksActionButtons: React.FC<ActionButtonsPropsType> = ({
    row,
}: ActionButtonsPropsType): ReactElement => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const userId = useAppSelector(state => state.profile._id)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const deletePackHandler = (): void => {
        setIsDeleteModalOpen(true)
    }
    const editPackHandler = (): void => {
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
            {isMyCards && (
                <>
                    <CustomIconButton
                        iconName={faTrashCan}
                        callback={deletePackHandler}
                        disabled={status === 'loading'}
                    />
                    <CustomIconButton
                        iconName={faPencil}
                        callback={editPackHandler}
                        disabled={status === 'loading'}
                    />
                </>
            )}
            <CustomIconButton
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
