import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from "./Home";
import Resultado from "./resultado";

const Rotas = () => {
   return(
    <Router>
        <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route path='/resultado' element={<Resultado/>} />
        </Routes>
    </Router>
   )
}

export default Rotas;