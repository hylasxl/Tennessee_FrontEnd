import axios from '../setup/axios'


const getAllClass = async () => {
    return await axios.get('/api/edu/get-all-class')
}

export {
    getAllClass
}