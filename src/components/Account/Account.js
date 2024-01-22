import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AirDatepicker from "air-datepicker";
import localeEn from "air-datepicker/locale/en";
import { updateUserData } from "../../service/userService";
import { Modal, Button, Form } from "react-bootstrap";
import { changePassword } from '../../service/userService'
import "./Account.scss";

export const Account = () => {
    const { user, loginContext } = useContext(UserContext);
    const [isChangeButtonShow, setIsChangeButtonShow] = useState(false);
    const [isPasswordModalShow, setIsPasswordModalShow] = useState(false);

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        dateofBirth: "",
        address: "",
    });

    const handleInputChange = (field, value) => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            [field]: value,
        }));

        if (!isChangeButtonShow) setIsChangeButtonShow(true);
    };

    const [passwordSet, setPasswordSet] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handlePasswordChange = (field, value) => {
        setPasswordSet((prevUserData) => ({
            ...prevUserData,
            [field]: value,
        }));
    };

    const navigate = useNavigate();

    useEffect(() => {
        // console.log(user);
        // console.log(2);
        if (user && user.user && user.user.userData) {
            const {
                firstName,
                lastName,
                email,
                phone,
                gender,
                dateofBirth,
                address,
            } = user.user.userData;

            setUserData({
                firstName: firstName || "",
                lastName: lastName || "",
                email: email || "",
                phone: phone || "",
                gender: gender || "",
                dateofBirth: dateofBirth || "",
                address: address || "",
            });
        }
    }, [user]);
    function formatDate(date) {
        var d = new Date(date),
            month = "" + (d.getMonth() + 1),
            day = "" + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }
    const startDate = new Date(userData.dateofBirth);
    formatDate(startDate);
    new AirDatepicker("#dateofBirth", {
        locale: localeEn,
        selectedDates: [startDate],
        onSelect: function (formattedDate) {
            // Call your function here
            handleInputChange("dateofBirth", formatDate(formattedDate.date));
        },
    });

    const handleChangeUserData = async () => {
        if (!userData.firstName || !userData.firstName === "") {
            toast.error("FirstName is required");
            return;
        }
        if (!userData.lastName || !userData.lastName === "") {
            toast.error("LastName is required");
            return;
        }
        if (userData.phone) {
            const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
            if (!userData.phone.match(regexPhoneNumber)) {
                toast.error("Phone number format is not correct");
                return;
            }
        }
        if (!userData.gender || !userData.gender === "") {
            toast.error("Gender is required");
            return;
        }
        if (!userData.dateofBirth || !userData.dateofBirth === "") {
            toast.error("Date of Birth is required");
            return;
        }
        if (userData.dateofBirth) {
            if (isNaN(new Date(userData.dateofBirth))) {
                toast.error("Date format is not correct");
                return;
            }
        }
        // console.log(user.user.userData.id);
        const status = await updateUserData(
            user.user.userData.id,
            userData.firstName,
            userData.lastName,
            userData.phone,
            userData.gender,
            userData.dateofBirth,
            userData.address,
            user.username,
            user.user.userPermissions.id
        );

        if (+(await status).EC === 1) {
            toast.success("Update Successfully");
            const newData = status.DT;
            let updatedObject = {
                ...user,
                user: { ...user.user, userData: newData },
            };
            console.log(updatedObject);
            loginContext(updatedObject);
            navigate('/account')
        } else {
            toast.error("Update Failed");
        }
    };

    const handleClose = () => {
        setIsPasswordModalShow(false);
        setPasswordSet({
            oldPassword: "",
            newPassword: "",
            confirmPassword: ""
        })
    }

    const handleShow = () => setIsPasswordModalShow(true);

    const handleUpdateChangePassword = async () => {
        if (!passwordSet.oldPassword || passwordSet.oldPassword === ' ') {
            toast.error("Password is empty")
            return
        }
        if (!passwordSet.newPassword || passwordSet.newPassword === ' ') {
            toast.error("New password is empty")
            return
        }
        const passwordRegex = /^(?!.* )(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/gm;
        if (!passwordSet.newPassword.match(passwordRegex)) {
            toast.error(" Your password must be 8-20 characters long, contain letters and number, and must not contain spaces")
            return
        }
        if (!passwordSet.confirmPassword || passwordSet.confirmPassword === ' ') {
            toast.error("Confirm password is empty")
            return
        }
        if (!(passwordSet.newPassword === passwordSet.confirmPassword)) {
            toast.error("Your confirm password doesn't match")
            return
        }

        const data = await changePassword(user.username, passwordSet.oldPassword, passwordSet.newPassword);

        if (+(await data).EC === 0) {
            toast.error("Your current password is not correct")
            return;
        } else if (+(await data).EC === 1){
            toast.success("Your password has been changed")
            setIsPasswordModalShow(false);
        }
    }

    return (
        <>
            <div className="account-info-container d-flex flex-column">
                <div className="row w-100">
                    <div className="col col-8 personal-infomartion p-5">
                        <h3 className="mb-5">Personal Information</h3>
                        <div className="user-information">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">
                                        Firstname
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Firstname"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={userData.firstName}
                                    onChange={(e) =>
                                        handleInputChange("firstName", e.target.value)
                                    }
                                />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">
                                        Lastname
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Lastname"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={userData.lastName}
                                    onChange={(e) =>
                                        handleInputChange("lastName", e.target.value)
                                    }
                                />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">
                                        Email
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Email"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={userData.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                    readOnly
                                />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">
                                        Phone
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Phone"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={userData.phone}
                                    onChange={(e) => handleInputChange("phone", e.target.value)}
                                />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">
                                        Gender
                                    </span>
                                </div>
                                <select
                                    value={userData.gender}
                                    onChange={(e) => handleInputChange("gender", e.target.value)}
                                    style={{ width: "90%" }}
                                    className="form-control"
                                >
                                    <option value="" disabled>
                                        Select
                                    </option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">
                                        Date of Birth
                                    </span>
                                </div>
                                <input
                                    id="dateofBirth"
                                    autoComplete="off"
                                    className="form-control"
                                    onChange={(e) =>
                                        handleInputChange("dateofBirth", e.target.value)
                                    }
                                    value={userData.dateofBirth}
                                />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="basic-addon1">
                                        Address
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    class="form-control"
                                    placeholder="Address"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    value={userData.address}
                                    onChange={(e) => handleInputChange("address", e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end w-100">
                            {isChangeButtonShow && (
                                <button
                                    className="change-btn"
                                    onClick={() => handleChangeUserData()}
                                >
                                    Change Information
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="col col-4 actions p-5 d-flex flex-column justify-content-around">
                        <div className="avatar d-flex flex-column">
                            <img
                                className="user-img"
                                width={120}
                                height={120}
                                src=""
                                alt="UserImg"
                            />
                            <button className="avt-btn">Click to change avatar</button>
                        </div>

                        <div className="action d-flex flex-column gap-3">
                            <button className="changePassword" onClick={() => handleShow()}>
                                Change Password
                            </button>
                            <button className="deactivate">Deactivate Account</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                show={isPasswordModalShow}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="">
                        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            value={passwordSet.oldPassword}
                            onChange={(e) => handlePasswordChange("oldPassword", e.target.value)}
                        />
                    </div>
                    <div className="mt-4 mb-4">
                        <Form.Label htmlFor="inputPassword5">New Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            value={passwordSet.newPassword}
                            onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be 8-20 characters long, contain letters and
                            numbers, and must not contain spaces;
                        </Form.Text>
                    </div>
                    <div className="">
                        <Form.Label htmlFor="inputPassword5">Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            id="inputPassword5"
                            aria-describedby="passwordHelpBlock"
                            value={passwordSet.confirmPassword}
                            onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                            Your password must be match.
                        </Form.Text>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleUpdateChangePassword()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
