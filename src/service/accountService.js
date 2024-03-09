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

const sendNewStudentAccountRequest = async (
    firstName, lastName, email, gender, dateofBirth, phone, address, userId
) => {
    return await axios.post('/api/account/send-new-student-account-request', {
        firstName, lastName, email, gender, dateofBirth, phone, address, userId
    })
}
const sendNewLecturerAccountRequest = async (
    firstName, lastName, email, gender, dateofBirth, phone, address,language,academicRank, userId
) => {
    return await axios.post('/api/account/send-new-lecturer-account-request', {
        firstName, lastName, email, gender, dateofBirth, phone, address, userId, language, academicRank
    })
}



export {
    fetchAccount,
    fetchOneAccount,
    fetchAccountByType,
    sendNewStudentAccountRequest,
    sendNewLecturerAccountRequest
}