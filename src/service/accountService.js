import axios from '../setup/axios'


const fetchAccount = async () => {
    return await axios.get('/api/account/fetch-all-accounts')
}

const fetchOneAccount = async (username) => {
    return await axios.post('/api/account/fetch-one-account', {
        username
    })
}

const fetchAccountByType = async (type) => {
    return await axios.post('/api/account/get-account-by-type', {
        type
    })
}

const fetchAvatar = async (id)=>{
    return await axios.post('/api/account/fetch-avatar',{
        id
    })
}
const changeAvatar = async (id,img)=>{
    var formData = new FormData()
    formData.append('id',id)
    formData.append('image',img)
    return await axios.post('/api/account/change-avatar',formData,{
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })
}

const addNewHighLevelAccount = async(firstName, lastName, email, gender, dateofBirth, phone, address, currentUserId, accountType)=>{
    return await axios.post('/api/account/add-new-high-level-account',{
        firstName, lastName, email, gender, dateofBirth, phone, address, currentUserId,accountType
    })
}

const checkExistMailandPhone = async (email,phone)=>{
    return await axios.post('/api/account/check-exist-email-and-phone',{
        email,phone
    })
}

const sendNewOtp = async (accountId,email)=>{
    return await axios.post('/api/otp/send-new-otp',{
        accountId,email
    })
}

const checkOtp = async(accountId,otp)=>{
    return await axios.post('/api/otp/check-otp',{
        accountId,otp
    })
}

const changePassword = async(accountId,password)=>{
    return await axios.put('/api/account/change-password',{
        accountId,password
    })
}


export {
    fetchAccount,
    fetchOneAccount,
    fetchAccountByType,
    fetchAvatar,
    changeAvatar,
    addNewHighLevelAccount,
    checkExistMailandPhone,
    sendNewOtp,
    checkOtp,
    changePassword
}