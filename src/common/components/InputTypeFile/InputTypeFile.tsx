import React, {ChangeEvent} from 'react'

import Button from '@mui/material/Button'

export const InputTypeFile: React.FC<PropsType> = ({buttonTitle, setImage}) => {
    const maxFileSize = 10000000
    const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < maxFileSize) {
                converterFileToBase64(file, (file64: string) => {
                    setImage(file64)
                })
            } else {
                // eslint-disable-next-line no-console
                console.error('Error: ', 'Too big file')
            }
        }
    }

    const converterFileToBase64 = (
        file: File,
        callBack: (value: string) => void,
    ): void => {
        const reader = new FileReader()

        reader.onloadend = () => {
            const file64 = reader.result as string

            callBack(file64)
        }
        reader.readAsDataURL(file)
    }

    return (
        <label htmlFor="uploadInput">
            <input
                type="file"
                id="uploadInput"
                onChange={uploadHandler}
                style={{display: 'none'}}
                accept={'image/*'}
            />
            <Button
                variant="contained"
                component="span"
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
