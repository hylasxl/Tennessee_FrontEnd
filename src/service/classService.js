import axios from '../setup/axios'


const getAllClass = async () => {
    return await axios.get('/api/class/fetch-all-classes')
}

export {
    getAllClass
}