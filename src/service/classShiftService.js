import axios from '../setup/axios'


const fetchAllClassShift = async () => {
    return await axios.get('/api/class-shift/fetch-all-class-shift')
}

export {
    fetchAllClassShift
}