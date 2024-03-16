import axios from '../setup/axios'

const fetchStudentTimeTable = async (studentId) => {
    return await axios.post('/api/student-timetable/fetch-by-id',{
        studentId
    })
}

export {
    fetchStudentTimeTable
}