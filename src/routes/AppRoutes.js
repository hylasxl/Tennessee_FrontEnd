import { Routes,Route } from "react-router-dom"
import HomePage from "../pages/Home/Home"
import LoginPage from "../pages/Login/Login"


const AppRoutes = (props) => {
    return(
        <>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
        </>
    )
}

export default AppRoutes