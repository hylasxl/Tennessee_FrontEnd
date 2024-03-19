import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import '../Login/Login.scss'
import { useNavigate, useLocation } from "react-router-dom";
import OTPInput from "../../components/OTP/OTP";



const AccountOTP = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { accountId,email } = location.state || {}
    

    return (
        <>
            <Header page="loginPage" title="LOGIN" />
            
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '400px', // This will make it vertically centered
                padding: '40px'  // This will make it spacious
            }}>
                <OTPInput accountId={accountId} email={email}/>
            </div>
            <Footer />

        </>)
}

export default AccountOTP