import axios from '../setup/axios'


const fetchStudentByClass = async (classId) => {
    return await axios.post('/api/student/fetch-by-class', {
        classId
    })
}

const saveStudent = async (classId, studentList) => {
    return await axios.post('/api/student/save-student', {
        classId, studentList
    })
}

const sendAbsentRequest = async (absentData) => {
    return await axios.post('/api/student/send-absent-request', {
        absentData
    })
}



export {
    fetchStudentByClass,
    saveStudent,
    sendAbsentRequest
}