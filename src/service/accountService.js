import axios from '../setup/axios'


const fetchAccount = async () => {
    return await axios.get('/api/admin/get-all-account')
}

const fetchOneAccount = async (username) => {
    return await axios.post('/api/admin/get-one-account', {
        username
    })
}

const fetchAccountByType = async (type) => {
    return await axios.post('/api/get-account-by-type', {
        type
    })
}

export {
    fetchAccount,
    fetchOneAccount,
    fetchAccountByType
}