import React from "react"
import './Header.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Header = (props) =>{
    const Logo = require('../../assets/Logo.png')
    const page = props.page || "normalPage";
    const pageTitle = props.title || "HOME";
    return (
        <>
            <div className='container mt-3'>
                <div className="row d-flex flex-row align-items-center justify-content-around">
                    <div className="col d-flex justify-content-center">Menu</div>
                    <div className="col d-flex justify-content-center">
                        <img className="logo" src={Logo} alt="Img Invalid"></img>
                    </div>
                    <div className="col d-flex justify-content-end text-danger fw-bold">BOOK A TOUR</div>
                </div>
            </div>
            <div className="nav-container container-fluid w-100 primary-bg">
                <div className="row d-flex align-items-center justify-content-between flex-row h-100">
                    <div className="col nav-start d-flex justify-content-start">
                        <p className="nav-text text-white">{pageTitle}</p>
                    </div>
                    { page !== "loginPage" && (
                        <div className="col nav-end d-flex justify-content-end">
                        <div className="login-section">
                            <p className="text-white">LOGIN</p>
                        </div>
                    </div>
                    )
                    }
                </div>
            </div>
        </>
    )
}

export default Header;