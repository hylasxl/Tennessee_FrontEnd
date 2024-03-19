import React from "react";
import './Footer.scss';
import { Link } from "react-router-dom";
import { FacebookRounded,Instagram,Twitter } from "@mui/icons-material";

const Footer = (props) =>{
    return (
        <>
            <div className="footer-container d-flex flex-column gap-5">
                <div className="footer-links d-flex flex-column gap-3">
                    <h5>QUICK LINKS</h5>
                    <div className="d-flex flex-row gap-4">
                        <Link className="links" to="/">ENROLL NOW</Link>
                        <Link className="links" to="/">POLICIES AND CHILD SAFETY</Link>
                        <Link className="links" to="/">CONTACT US</Link>
                    </div>
                </div>
                <div className="footer-links d-flex flex-column gap-3">
                    <h5>FOLLOW US</h5>
                    <div className="d-flex flex-row gap-4">
                        <Link className="links" to="/"><FacebookRounded sx={{fontSize:'40px'}}/></Link>
                        <Link className="links" to="/"><Instagram sx={{fontSize:'40px'}}/></Link>
                        <Link className="links" to="/"><Twitter sx={{fontSize:'40px'}}/></Link>
                        
                    </div>
                </div>
                <div className="footer-desc d-flex flex-row gap-2">
                    <p>The care, safety and wellbeing of all children and vulnerable people is a core and fundamental responsibility for our community.</p>
                    <p>We acknowledge the Traditional Owners of the land on which our College resides and pay our respects to their Elders, past, present and future.</p>
                </div>
            </div>
        </>
    )
}

export default Footer;