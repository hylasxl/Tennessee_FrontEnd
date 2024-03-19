import axios from '../setup/axios'


const getAllClass = async (type) => {
    return await axios.post('/api/class/fetch-all-classes',{
        type
    })
}

const sendNewClassRequest = async (className, courseId, languageId, startDate, lecturerId, quantity, shift, description, userId, weekdays) => {
    return await axios.post('/api/class/send-new-class-request', {
        className, courseId, languageId, startDate, lecturerId, quantity, shift, description, userId, weekdays
    })
}

const countClassRequest = async ()=>{
    return await axios.get('/api/class/count-request')
}

const classApprove = async (currentId, classId, approveType) => {
    return await axios.post('/api/class/class-approve', {
        currentId, classId, approveType
    })
}

const fetchClassByStudent = async (studentId)=>{
    return await axios.post('/api/class/fetch-class-student',{
        studentId
    })
}
const fetchClassByLecturer = async (lecturerId)=>{
    return await axios.post('/api/class/fetch-class-lecturer',{
        lecturerId
    })
}

const fetchClassSchedule = async(classId)=>{
    return await axios.post('/api/class/fetch-class-schedule-by-id',{
        classId
    })
}

const approveAbsentRequest = async(request,type)=>{
    return await axios.put('/api/class/lecturer/approve-absent-request',{
        request,type
    })
}


export {
    getAllClass,
    sendNewClassRequest,
    countClassRequest,
    classApprove,
    fetchClassByStudent,
    fetchClassByLecturer,
    fetchClassSchedule,
    approveAbsentRequest
}