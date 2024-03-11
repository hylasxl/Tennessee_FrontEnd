import axios from '../setup/axios'


const fetchLecturerByLanguage = async (languageId) => {
    return await axios.post('/api//lecturer/fetch-lecturer-by-language',{
        languageId
    })
}

export {
    fetchLecturerByLanguage
}