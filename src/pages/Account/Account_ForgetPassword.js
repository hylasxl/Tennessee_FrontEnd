import { useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import '../Login/Login.scss'
import { checkExistMailandPhone } from "../../service/accountService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { sendNewOtp } from "../../service/accountService";

const AccountForgetPassword = (props) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    const handleSendOtp = async(accountId,email)=>{
        return new Promise(async (resolve,reject)=>{
            await sendNewOtp(accountId,email).then((res)=>{
                if(res.EC===1){
                    resolve()
                }
                else reject()
            })
        })
    }

    const handleConfrim = async () => {
        if (!email.trim()) {
            toast.warn("Email is missing")
            return
        }
        if (!phone.trim()) {
            toast.warn("Phone is missing")
            return
        }
        return await checkExistMailandPhone(email, phone).then((res)=>{
            if(+res.DT===0){
                toast.warn("Email or Phone is not correct")
            } else {
                const promise = handleSendOtp(res.DT,email)
                toast.promise(promise, {
                    pending: 'Sending OTP',
                    success: 'Send OTP Successfully',
                    error: 'Error when sending OTP',
                })
                navigate("/account/password/otp-input",{state:{accountId: res.DT,email: email}})

            }
        })
    }

    return (
        <>
            <Header page="loginPage" title="LOGIN" />

            <div className="container-fluid w-100 d-flex justify-content-center mt-5 mb-5">
                <div className="login-form w-50 p-2">
                    <p className="text-center fw-bold  fs-5">Tennessee Language Center</p>
                    <p className="text-center fw-bold fst-italic fs-4">Forget Password</p>

                    <div className="mb-3 me-3 ms-3">
                        <p className="mt-2 mb-2 fw-bold">Email</p>
                        <input
                            className="form-control"
                            autoComplete="off"
                            type="text"
                            name="username"
                            id="accountID"
                            value={email}
                            autoFocus
                            onChange={(event) => { setEmail(event.target.value) }}
                        ></input>
                        <div id="emailHelp" className="form-text">
                            We'll never share your private account with anyone else.
                        </div>
                    </div>
                    <div className="mb-3 me-3 ms-3">
                        <p className="mt-2 mb-2 fw-bold">Phone</p>
                        <input
                            className="form-control"
                            autoComplete="off"
                            type="text"
                            name="Phone"
                            id="Phone"
                            value={phone}
                            onChange={(event) => { setPhone(event.target.value) }}
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
        </>)
}

export default AccountForgetPassword