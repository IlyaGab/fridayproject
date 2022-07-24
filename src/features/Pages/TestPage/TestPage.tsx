import {Button, Checkbox, Slider} from '@mui/material';
import classes from './test.module.scss'
import {Navigate} from 'react-router-dom';
import {PATH} from '../Pages';
import React from 'react';
import {useAppSelector} from '../../../common/hooks/useAppSelector';


export const TestPage = () => {
    const isLoggedIn = useAppSelector(state => state.loginReducer.isLoggedIn)
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