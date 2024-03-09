import axios from '../setup/axios'


const getAllLanguage = async () => {
    return await axios.get('/api/language/fetch-all-languages')
}


export {
    getAllLanguage
}