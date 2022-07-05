import React from 'react';
import './App.css';
import {HashRouter} from 'react-router-dom';
import Header from './components/Header/Header';
import Pages from './components/Pages/Pages';



function App() {
    return (
        <div className="App">
            <HashRouter>
                <Header/>
                <Pages/>
            </HashRouter>
        </div>
    );
}

export default App;
