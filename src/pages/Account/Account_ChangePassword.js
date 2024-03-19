import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import '../Login/Login.scss'
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { changePassword } from "../../service/accountService";
import { useNavigate } from "react-router-dom";

const AccountChangePassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const { accountId } = location.state || {}

    const handleConfrim = async () => {
        var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,32}$/;

        if (!newPassword || !newPassword.trim === "") {
            toast.warn("New Password is missing")
            return
        }
        if (!confirmPassword || !confirmPassword.trim() === "") {
            toast.warn("Confirm Password is missing")
            return
        }
        if(!passwordRegex.test(newPassword)){
            toast.warn("Password format is not correct")
            return
        }
        if (newPassword !== confirmPassword) {
            toast.warn("Confirm Password does not match")
        }
        console.log(accountId);
        await changePassword(accountId,newPassword).then((res)=>{
            if(+res.EC===1){
                toast.success("Change password successfully")
                navigate('/login')
            } else toast.error("An error has occured")
        })
    }
    return (
        <>
            <Header page="loginPage" title="LOGIN" />
            <div className="container-fluid w-100 d-flex justify-content-center mt-5 mb-5">
                <div className="login-form w-50 p-2">
                    <p className="text-center fw-bold  fs-5">Tennessee Language Center</p>
                    <p className="text-center fw-bold fst-italic fs-4">Set New Password</p>

                    <div className="mb-3 me-3 ms-3">
                        <p className="mt-2 mb-2 fw-bold">New Password</p>
                        <input
                            className="form-control"
                            autoComplete="off"
                            type="text"
                            name="username"
                            id="accountID"
                            value={newPassword}
                            autoFocus
                            onChange={(event) => { setNewPassword(event.target.value) }}
                        ></input>
                        <div id="emailHelp" className="form-text">
                            At least one digit,
                            at least one lowercase character,
                            at least one uppercase character,
                            at least one special character,
                            length between 8 and 32 characters
                        </div>
                    </div>
                    <div className="mb-3 me-3 ms-3">
                        <p className="mt-2 mb-2 fw-bold">Confirm Password</p>
                        <input
                            className="form-control"
                            autoComplete="off"
                            type="text"
                            name="Phone"
                            id="Phone"
                            value={confirmPassword}
                            onChange={(event) => { setConfirmPassword(event.target.value) }}
                        ></input>
                    </div>
                    <div className="login-btn-section w-100 d-flex justify-content-center">
                        <button className="login-btn" onClick={() => {
                            handleConfrim()
                        }}>Confirm</button>
                    </div>

                </div>
            </div>

            <Footer />
        </>
    )
}

export default AccountChangePassword