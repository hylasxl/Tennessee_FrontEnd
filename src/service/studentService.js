import axios from '../setup/axios'


const fetchStudentByClass = async (classId) => {
    return await axios.post('/api/student/fetch-by-class', {
        classId
    })
}

const saveStudent = async(classId,studentList)=>{
    return await axios.post('/api/student/save-student',{
        classId,studentList
    })
}

export {
    fetchStudentByClass,
    saveStudent
}