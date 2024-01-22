import React from "react";
import "./Header.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navigation from "../Navigation/Navigation";


const Header = (props) => {
    const Logo = require("../../assets/Logo.png");
    
    return (
        <>
            <div className="container mt-3">
                <div className="row d-flex flex-row align-items-center justify-content-around">
                    <div className="col d-flex justify-content-center">Menu</div>
                    <div className="col d-flex justify-content-center">
                        <img className="logo" src={Logo} alt="Img Invalid"></img>
                    </div>
                    <div className="col d-flex justify-content-end text-danger fw-bold">
                        BOOK A TOUR
                    </div>
                </div>
            </div>
            <div className="nav-container w-100 primary-bg">
                <Navigation/>
                
            </div>
        </>
    );
}














export default Header;
