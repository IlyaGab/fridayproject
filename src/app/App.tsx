import React, {ReactElement, useEffect} from "react";
import {Header} from "../features/Header/Header";
import "./App.module.scss";
import {initializeAppTC} from "./appReducer";
import {useAppSelector} from "../common/hooks/useAppSelector";
import {useAppDispatch} from "../common/hooks/useAppDispatch";
import {CircularProgressComponent} from "../common/components/CircularProgress/CircularProgress";
import {RoutersList} from "../common/components/RoutesList/RoutersList";
import {NavLinkList} from "../common/components/NavlinkList/NavLinkList";
import {LinearProgress} from "@mui/material";

export const App = (): ReactElement => {
    const dispatch = useAppDispatch()

    const isInitialized = useAppSelector(state => state.appReducer.isInitialized)
    const status = useAppSelector(state => state.appReducer.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    if (!isInitialized) {
        return <CircularProgressComponent/>
    }

    return (
        <div>
            <Header/>
            {status === "loading" && <LinearProgress color="inherit"/>}
            <div>
                <RoutersList/>
                <NavLinkList/>
            </div>
        </div>
    )
}