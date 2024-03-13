import axios from '../setup/axios'


const fetchLecturerByLanguage = async (languageId, startDate, classShift, weekdays,courseId) => {
    return await axios.post('/api//lecturer/fetch-lecturer-by-language', {
        languageId, startDate, classShift, weekdays,courseId
    })
}

export {
    fetchLecturerByLanguage
}