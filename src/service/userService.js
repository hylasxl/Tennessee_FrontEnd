import axios from "../setup/axios";

const login = async (username, password) => {
    return await axios.post('/api/account/login', {
        username, password
    })
}

const logout = async () => {
    return axios.post('/api/account/logout')
}
const getUserData = async (userID) => {
    return await axios.post('/api/account/fetch-user-data', {
        userID
    })
};

const getUserAccount = async () => {
    return await axios.get('/api/account/fetch-user-account')
};

const updateUserData = async (userId,
    firstName,
    lastName,
    phone,
    gender,
    dateofBirth,
    address,
    username, accountTypeId) => {
    return await axios.put('/api/account/update-user-data', {
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
    return await axios.put('/api/account/account-update-password', {
        username, oldPassword, newPassword
    })
}


const setUserEnvironment  =async()=>{
    return await axios.put('/api/env/update')
}

export {
    login,
    getUserData,
    getUserAccount,
    logout,
    updateUserData,
    changePassword,
    setUserEnvironment
}