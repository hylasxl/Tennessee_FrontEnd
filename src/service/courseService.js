import axios from '../setup/axios'

const fetchAllCourse = async () => {
    return await axios.get('/api/course/fetch-all-courses')
}

// const sendRequestCreateCourse = async (
//     courseName,
//     language,
//     duration,
//     durationofLesson,
//     numberofLesson,
//     price,
//     description,
//     lesson,
//     userId,
//     image
// ) => {


//     return await axios.post('/api/course/create-course', {
//         courseName,
//         language,
//         duration,
//         durationofLesson,
//         numberofLesson,
//         price,
//         description,
//         lesson,
//         userId,
//     })

// }
const sendRequestCreateCourse = async (
    courseName,
    language,
    duration,
    durationofLesson,
    numberofLesson,
    price,
    description,
    lesson,
    userId,
    image
) => {

    var formData = new FormData();
    formData.append('image',image)
    formData.append('courseName',courseName)
    formData.append('language',language)
    formData.append('duration',duration)
    formData.append('durationofLesson',durationofLesson)
    formData.append('numberofLesson',numberofLesson)
    formData.append('price',price)
    formData.append('description',description)
    formData.append('lesson',lesson)
    formData.append('userId',userId)

    for(var pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
     }

    return await axios.post('/api/course/create-course', formData ,{
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    })
}

const courseRequestApproval = async (id, status,approveId) => {
    return await axios.post('/api/course/course-approval', {
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