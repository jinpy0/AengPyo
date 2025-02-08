import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/Login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
