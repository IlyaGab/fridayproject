import React, {useState} from 'react';
import {CustomModal} from '../CustomModal';
import {CardType} from '../../../api/cardsAPI';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {changeCardTC} from '../../Pages/CardsList/cardsListReducer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import Input from '@mui/material/Input';

export const EditCardModal: React.FC<EditCardModalPropsType> = ({isModalOpen, setIsModalOpen, row}) => {
    const [newQuestion, setNewQuestion] = useState(row.question)
    const [newAnswer, setNewAnswer] = useState(row.answer)

    const dispatch = useAppDispatch()

    const editCard = () => {
        dispatch(changeCardTC({question: newQuestion, answer: newAnswer, _id: row._id}))
        setIsModalOpen(false)
    }

    return (
        <CustomModal
            modalTitle={'Edit card name'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={editCard}
            buttonTitle={'Save'}
        >
            <div>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Choose a question format
                    </InputLabel>
                    <NativeSelect
                        defaultValue={'Text'}
                    >
                        <option value={'Text'}>Text</option>
                        <option value={'Image'}>Image</option>
                    </NativeSelect>
                </FormControl>
            </div>
            <div>
                <Input
                    value={newQuestion}
                    placeholder={'Question'}
                    onChange={e => setNewQuestion(e.currentTarget.value)}
                    fullWidth={true}
                    style={{marginTop: '20px', marginBottom: '20px'}}
                />
            </div>
            <div>
                <Input
                    value={newAnswer}
                    placeholder={'Answer'}
                    onChange={e => setNewAnswer(e.currentTarget.value)}
                    fullWidth={true}
                    style={{marginBottom: '20px'}}
                />
            </div>
        </CustomModal>
    )
}

type EditCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
    row: CardType
}