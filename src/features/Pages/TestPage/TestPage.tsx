import {Button, Checkbox, Slider} from '@mui/material';
import classes from './test.module.scss'



export const TestPage = () => {

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