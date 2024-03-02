import Header from "../../components/Header/Header";
import React, { useEffect, useState,useContext } from "react";
import Tags from "../../components/Tags/Tags"
import Footer from "../../components/Footer/Footer";
import "./Home.scss";
// import { UserContext } from "../../context/UserContext";
import { getUserData } from "../../service/userService";

const HomePage = (props) => {
    const mainPicture = require("../../assets/main-img.jpeg");
    
   

    return (
        <>
            <Header/>
            <img
                className="mainPic w-100 h-auto position-relative"
                src={mainPicture}
                alt="Main Pic"
            ></img>
            <Tags
                side="left"
                imgpath={require("../../assets/leadership.jpg")}
                maintopic="About Us"
                desc="Explore more about our stragies and history."
            />
            <div className="chairman-speech d-flex w-100 flex-column ">
                <div className="chairman-img">
                    <img
                        src={require("../../assets/priciple.jpg")}
                        className="w-100 h-auto"
                        alt="AltImg"
                    ></img>
                </div>
                <div className="chairman-comment d-flex flex-column justify-content-center align-items-center p-4 gap-4">
                    <h5>A MESSAGE FROM THE PRINCIPLE</h5>
                    <div className="speech">
                        <p>
                            Tennessee Language Center is a welcoming Catholic community
                            renowned for its integrity and creative learning approaches that
                            bring out the best in boys. Our rich Tennessee charism underpinned
                            by the educational principles of founder, St John Bosco, provides
                            the foundation of a future focused pedagogical vision.
                        </p>
                    </div>

                    <div className="chairman-profile d-flex flex-row">
                        <div className="chairman-avt">
                            <img
                                src={require("../../assets/SalesianImage-300x300.jpg")}
                                alt=""
                            ></img>
                        </div>
                        <div className="chairman-title d-flex flex-column ms-3 justify-content-center gap-4">
                            <div className="chairman-name">Mark Ashmore</div>
                            <div className="chairman-position">Principle</div>
                        </div>
                    </div>
                </div>
            </div>

            <Tags
                side="right"
                imgpath={require("../../assets/contact.jpg")}
                maintopic="WHY YOU SHOULD CHOOSE US?"
                desc="We're committed to recognising the contributions our past pupils make. Explore the digital Honour Roll profiles or contribute any information you might have about past students."
            />
            <Tags
                side="left"
                imgpath={require("../../assets/employment.jpg")}
                maintopic="EMPLOYMENT"
                desc="We are committed to recruiting staff who embody our community’s high expectations, and who support our mission to develop our students’ intellectual, physical, spiritual and artistic skills."
            />

            <Footer/>
        </>
    );
};

export default HomePage;
