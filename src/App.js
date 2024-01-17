import { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DNA } from "react-loader-spinner";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import HomePage from "./pages/Home/Home";
import './App.scss'

function App() {

  const { user } = useContext(UserContext)

  return (
    <Fragment>
      <div className="app-container">

        <Router>
          <AppRoutes/>
        </Router>

      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Fragment>
  );
}

export default App;
