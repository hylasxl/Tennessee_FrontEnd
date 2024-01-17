import axios from '../setup/axios'


const fetchAccount = async () => {
    return await axios.get('/api/admin/get-all-account')
}

export {
    fetchAccount
}