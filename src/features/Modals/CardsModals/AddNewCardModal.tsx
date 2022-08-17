import React, {useState} from 'react';
import {CustomModal} from '../CustomModal';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import {useAppDispatch} from '../../../common/hooks/useAppDispatch';
import {createCardTC} from '../../Pages/CardsList/cardsListReducer';
import {useAppSelector} from '../../../common/hooks/useAppSelector';

export const AddNewCardModal: React.FC<AddNewCardModalPropsType> = ({isModalOpen, setIsModalOpen}) => {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')

    const cardsPack_id = useAppSelector(state => state.cardsList.queryParams.cardsPack_id)
    const dispatch = useAppDispatch()

    const addCard = () => {
        dispatch(createCardTC({question, answer, cardsPack_id}))
        setQuestion('')
        setAnswer('')
    }

    return (
        <CustomModal
            modalTitle={'Add new card'}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleOperation={addCard}
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
                    value={question}
                    placeholder={'Question'}
                    onChange={e => setQuestion(e.currentTarget.value)}
                    fullWidth={true}
                    style={{marginTop: '20px', marginBottom: '20px'}}
                />
            </div>
            <div>
                <Input
                    value={answer}
                    placeholder={'Answer'}
                    onChange={e => setAnswer(e.currentTarget.value)}
                    fullWidth={true}
                    style={{marginBottom: '20px'}}
                />
            </div>
        </CustomModal>
    )
}

type AddNewCardModalPropsType = {
    isModalOpen: boolean
    setIsModalOpen: (value: boolean) => void
}
