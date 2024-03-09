import axios from '../setup/axios'

const fetchAllList = async ()=>{
    return await axios.get('/api/student-account-list/fetch-all')
}

export {
    fetchAllList
}