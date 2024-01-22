import axios from '../setup/axios'


const getAllLanguage = async () => {
    return await axios.get('/api/language/get-all-language')
}


export {
    getAllLanguage
}