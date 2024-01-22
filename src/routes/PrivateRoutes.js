import {Route,Routes } from "react-router-dom";

const PrivateRoutes = (props) =>{
        return (
            <Routes>
                <Route path={props.path} element={props.element}/>
            </Routes>
    

        )
}

export default PrivateRoutes;