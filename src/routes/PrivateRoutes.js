import {Route, redirect,Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useContext, useEffect} from "react";
import { UserContext } from "../context/UserContext";

const PrivateRoutes = (props) =>{
    const navigate = useNavigate()
    const { user }= useContext(UserContext);
        return (
            <Routes>
                <Route path={props.path} element={props.element}/>
            </Routes>
    

        )
}

export default PrivateRoutes;