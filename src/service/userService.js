// import axios from "axios"
import axios from "../setup/axios";

const login = async (username, password) => {
    return await axios.post('/api/login', {
        username, password
    })
}

const logout = async () => {
    return axios.post('/api/logout')
}
const getUserData = async (userID) => {
    return await axios.post('/api/user/getdata', {
        userID
    })
};

const getUserAccount = async () => {
    return await axios.get('/api/user/getaccount')
};

const updateUserData = async (userId,
    firstName,
    lastName,
    phone,
    gender,
    dateofBirth,
    address,
    username, accountTypeId) => {
    return await axios.put('/api/user/update', {
        userId,
        firstName,
        lastName,
        phone,
        gender,
        dateofBirth,
        address,
        username,
        accountTypeId
    })
}

const changePassword = async (username, oldPassword, newPassword) => {
    return await axios.put('/api/user/changepassword', {
        username, oldPassword, newPassword
    })
}


export {
    login,
    getUserData,
    getUserAccount,
    logout,
    updateUserData,
    changePassword
}