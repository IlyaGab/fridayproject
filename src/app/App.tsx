import React, {ReactElement, useEffect} from 'react'

import {LinearProgress} from '@mui/material'

import {CircularProgressComponent} from '../common/components/CircularProgress/CircularProgress'
import {RoutersList} from '../common/components/RoutesList/RoutersList'
import {useAppDispatch} from '../common/hooks/useAppDispatch'
import {useAppSelector} from '../common/hooks/useAppSelector'
import {Header} from '../features/Header/Header'

import styles from './app.module.scss'
import {initializeAppTC} from './appReducer'

export const App = (): ReactElement => {
    const dispatch = useAppDispatch()

    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const status = useAppSelector(state => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <CircularProgressComponent />
    }

    return (
        <div className={styles.app}>
            <Header />
            {status === 'loading' && (
                <LinearProgress color="inherit" className={styles.linearProgress} />
            )}
            <div>
                <RoutersList />
            </div>
        </div>
    )
}
