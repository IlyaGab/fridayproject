import {ReactElement} from 'react'

import {CircularProgress} from '@mui/material'

export const CircularProgressComponent = (): ReactElement => {
    return (
        <div
            style={{
                position: 'fixed',
                top: '35%',
                textAlign: 'center',
                width: '100%',
                zIndex: '1',
                opacity: '0.7',
            }}
        >
            <CircularProgress size={50} disableShrink />
        </div>
    )
}
