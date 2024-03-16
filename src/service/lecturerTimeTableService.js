import axios from '../setup/axios'


const fetchLecturerTimeTable = async (lecturerId) => {
    return await axios.post('/api/lecturer-timetable/fetch-by-id',{
        lecturerId
    })
}

export {
    fetchLecturerTimeTable
}