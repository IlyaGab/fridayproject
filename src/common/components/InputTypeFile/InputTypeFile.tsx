import React, {ChangeEvent} from 'react';
import Button from '@mui/material/Button';

export const InputTypeFile: React.FC<PropsType> = ({buttonTitle, setImage}) => {
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 10000000) {
                converterFileToBase64(file, (file64: string) => {
                    setImage(file64)
                })
            } else {
                console.error('Error: ', 'Too big file')
            }
        }
    }

    const converterFileToBase64 = (file: File, callBack: (value: string) => void) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const file64 = reader.result as string
            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    return (
        <label>
            <input
                type={'file'}
                onChange={uploadHandler}
                style={{display: 'none'}}
                accept={'image/*'}
            />
            <Button
                variant={'contained'}
                component={'span'}
                sx={{borderRadius: '30px', padding: '5px 30px', marginBottom: '20px'}}
                fullWidth
            >
                {buttonTitle}
            </Button>
        </label>
    )
}

type PropsType = {
    buttonTitle: string
    setImage: (value: string) => void
}