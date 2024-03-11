import axios from '../setup/axios'

const sendNewStudentAccountRequest = async (
    firstName, lastName, email, gender, dateofBirth, phone, address, userId
) => {
    return await axios.post('/api/student-list/send-new-student-account-request', {
        firstName, lastName, email, gender, dateofBirth, phone, address, userId
    })
}

const fetchAllList = async ()=>{
    return await axios.get('/api/student-list/fetch-all')
}

export {
    fetchAllList,
    sendNewStudentAccountRequest
}