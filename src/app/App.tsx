import React, {useEffect} from 'react';
import Header from '../features/Header/Header';
import Pages from '../features/Pages/Pages';
import './App.scss';
import {useAppDispatch} from "../common/hooks/hooks";
import {setProfileDataTC} from "../features/Pages/ProfilePage/profilePageReducer";



function App() {

    const dispatch = useAppDispatch()


    useEffect(()=>{
        dispatch(setProfileDataTC())
    })


    return (
        <div className="App">
                <Header/>
                <Pages/>
        </div>
    );
}

export default App;
