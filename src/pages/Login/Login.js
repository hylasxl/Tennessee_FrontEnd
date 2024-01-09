import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Login.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"
import { login } from "../../service/userService";


const LoginPage = (props) => {

    

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const defaultValidInput = {
        isValidEmail: true,
        isValidPassword: true
    }

    const [valueInput, setValueInput] = useState(defaultValidInput);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setValueInput(defaultValidInput);
        if (!username) {
            setValueInput({
                isValidEmail: false,
                isValidPassword: true
            })
            toast.error("Enter your username!")
            return;
        }
        if (!password) {
            setValueInput({
                isValidEmail: true,
                isValidPassword: false
            })
            toast.error("Enter you password")
            return;
        }

        const response = await login(username,password);

        console.log(response);

        if(response && response.data && +(await response).data.EC === 1){
            toast.success("Login Successfully")
            let data = {
                isAuthenticated: true,
                token: 'fake'
            }
            sessionStorage.setItem('account',JSON.stringify(data))
            navigate('/');
            
        }
        
        if(response && response.data && +(await response).data.EC !== 1){
            toast.error("Incorrect username or password")
        }

    }

    const handlePressEnter = (event) => {
        if (event.keyCode === 13) handleLogin();
    }

    return (
        <>
            <Header page="loginPage" title="LOGIN" />

            <div className="container-fluid w-100 d-flex justify-content-center mt-5 mb-5">
                <div className="login-form w-50 p-2">
                    <p class="text-center fw-bold  fs-5">Tennessee Language Center</p>
                    <p class="text-center fw-bold fst-italic fs-4">Sign in</p>
                    
                        <div className="mb-3 me-3 ms-3">
                            <p className="mt-2 mb-2 fw-bold">Username</p>
                            <input
                                autocomplete="off"
                                type="text"
                                name="username"
                                class={valueInput.isValidEmail ? 'form-control' : 'is-invalid form-control'}
                                id="accountID"
                                value={username}
                                onChange={(event) => { setUsername(event.target.value) }}
                                
                            ></input>
                            <div id="emailHelp" class="form-text">
                                We'll never share your private account with anyone else.
                            </div>
                        </div>
                        <div className="mb-3 me-3 ms-3">
                            <p className="mt-2 mb-2 fw-bold">Password</p>
                            <input
                                autocomplete="off"
                                type="password"
                                name="password"
                                class={valueInput.isValidEmail ? 'form-control' : 'is-invalid form-control'}
                                id="password"
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                                onKeyDown={(event)=>{handlePressEnter(event)}}
                            ></input>
                        </div>
                        <Link to="" className="forget-password">Forget Password?</Link>
                        <div className="login-btn-section w-100 d-flex justify-content-center">
                            <button className="login-btn" onClick={() => handleLogin()}>Sign in</button>
                        </div>
                    
                </div>
            </div>

            <Footer />
        </>
    );
};

export default LoginPage;
