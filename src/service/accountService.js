import axios from '../setup/axios'


const fetchAccount = async () => {
    return await axios.get('/api/account/fetch-all-accounts')
}

const fetchOneAccount = async (username) => {
    return await axios.post('/api/account/fetch-one-account', {
        username
    })
}

const fetchAccountByType = async (type) => {
    return await axios.post('/api/account/get-account-by-type', {
        type
    })
}



export {
    fetchAccount,
    fetchOneAccount,
    fetchAccountByType,
}