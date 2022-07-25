import { CircularProgress } from '@mui/material';

export const CircularProgressComponent = () => {
    return <div
        style={{ position: 'fixed', top: '35%', textAlign: 'center', width: '100%', zIndex: '1',  opacity:'0.7' }}>
        <CircularProgress size={150} disableShrink={true} />
    </div>
}
