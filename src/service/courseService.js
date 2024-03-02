import axios from '../setup/axios'

const fetchAllCourse = async () => {
    return await axios.get('/api/edu/get-all-course')
}

const sendRequestCreateCourse = async (
    courseName,
    language,
    duration,
    durationofLesson,
    numberofLesson,
    price,
    description,
    lesson,
    userId
) => {

    return await axios.post('/api/edu/create-course', {
        courseName,
        language,
        duration,
        durationofLesson,
        numberofLesson,
        price,
        description,
        lesson,
        userId
    })

}

const courseRequestApproval = async (id, status,approveId) => {
    return await axios.post('/api/admin/course/approval', {
        id,
        status,
        approveId
    })
}

export {
    fetchAllCourse,
    sendRequestCreateCourse,
    courseRequestApproval
}