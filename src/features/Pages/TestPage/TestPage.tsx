import {Button, Checkbox, Slider} from '@mui/material';
import classes from './test.module.scss'
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../app/store';
import {Navigate} from 'react-router-dom';
import {PATH} from '../Pages';
import React from 'react';



export const TestPage = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    if(!isLoggedIn) {
        return <Navigate to={PATH.Login}/>
    }

    return (
        <div>
            <hr/>
            <div className={classes.column}>
                <Button variant="outlined" >Outlined</Button>
                <Checkbox defaultChecked />
                <div className={classes.slider}>
                <Slider
                    defaultValue={70}
                    aria-label="Disabled slider"
                    valueLabelDisplay="auto"
                />
                </div>
            </div>
        </div>
    )
}