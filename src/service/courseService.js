import axios from '../setup/axios'

const fetchAllCourse = async () => {
    return await axios.get('/api/edu/get-all-course')
}



export {
    fetchAllCourse
}