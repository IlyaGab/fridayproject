import React, {ReactElement} from 'react'

import MuiAlert, {AlertProps} from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

import {setAppErrorAC} from '../../../app/appReducer'
import {useAppDispatch} from '../../hooks/useAppDispatch'
import {useAppSelector} from '../../hooks/useAppSelector'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const ErrorSnackbar = (): ReactElement => {
    const error = useAppSelector(state => state.app.error)

    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null))
    }

    return (
        <Snackbar
            open={error !== null}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}
