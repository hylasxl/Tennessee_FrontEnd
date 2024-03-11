import axios from '../setup/axios'

const fetchAllList = async ()=>{
    return await axios.get('/api/lecturer-list/fetch-all')
}

const sendNewLecturerAccountRequest = async (
    firstName, lastName, email, gender, dateofBirth, phone, address,language,academicRank, userId
) => {
    return await axios.post('/api/lecturer-list/send-new-lecturer-account-request', {
        firstName, lastName, email, gender, dateofBirth, phone, address, userId, language, academicRank
    })
}

export {
    fetchAllList,
    sendNewLecturerAccountRequest
}