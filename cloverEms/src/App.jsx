import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Nav from "./Components/Nav.jsx";
import Home from "./Components/Home.jsx";
import About from "./Components/About.jsx";
import Createuser from "./Components/Createuser.jsx";
import Alluser from "./Components/Alluser.jsx";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import Edit from "./Components/Edit.jsx";

let App = () => {
    return (
        <>
            <BrowserRouter>
                <Nav></Nav>
                <Routes>
                    <Route path={'/'} element={<Home></Home>}></Route>
                    <Route path={'/About'} element={<About></About>}></Route>
                    <Route path={'/Create User'} element={<Createuser></Createuser>}></Route>
                    <Route path={'/Create user'} element={<Createuser></Createuser>}></Route>
                    <Route path={'/All user'} element={<Alluser></Alluser>}></Route>
                    <Route path={'/Login'} element={<Login></Login>}></Route>
                    <Route path={'/Sign Up'} element={<Signup></Signup>}></Route>
                    <Route path={'/Sign up'} element={<Signup></Signup>}></Route>
                    <Route path={'/Signup'} element={<Signup></Signup>}></Route>
                    <Route path={'/Edit/:id'} element={<Edit></Edit>}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App
