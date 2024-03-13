import axios from '../setup/axios'


const fetchLessonByCourse = async (courseId) => {
    return await axios.post('/api/lesson/fetch-lesson-by-course',{
        courseId
    })
}

export {
    fetchLessonByCourse
}