import {Button, Checkbox, Slider} from '@mui/material';
import './_test.scss'



export const TestPage = () => {

    return (
        <div>
            <hr/>
            <div className='column'>
                <Button variant="outlined" >Outlined</Button>
                <Checkbox defaultChecked />
                <div className='slider'>
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