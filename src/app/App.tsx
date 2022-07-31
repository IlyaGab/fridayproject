import React, {useEffect} from 'react';
import {Header} from '../features/Header/Header';
import './App.module.scss';
import {initializeAppTC} from './appReducer';
import {useAppSelector} from '../common/hooks/useAppSelector';
import {useAppDispatch} from '../common/hooks/useAppDispatch';
import {CircularProgressComponent} from '../common/components/CircularProgress/CircularProgress';
import {RoutersList} from "../common/components/RoutesList/RoutersList";
import {NavLinkList} from "../common/components/NavlinkList/NavLinkList";

export const App = () => {
    const isInitialized = useAppSelector(state => state.appReducer.isInitialized)
    const status = useAppSelector(state => state.appReducer.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <CircularProgressComponent/>
    }

    return (
        <>
            {status !== 'loading' ? <div>
                    <Header/>
                    <RoutersList/>
                    <NavLinkList/>
                </div>
                : <CircularProgressComponent/>}
        </>
    )
}