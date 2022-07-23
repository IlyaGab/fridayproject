import { TextField } from '@mui/material';
import React from 'react';
import classes from './_registrationPage.module.scss'

export const RegistartionPage = () => {
    return (
        <div className={classes.registrationPageContainer}>
            <TextField id="filled-basic" label="Filled" variant="filled" />
        </div>
    );
};

