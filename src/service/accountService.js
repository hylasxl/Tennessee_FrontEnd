import axios from '../setup/axios'


const fetchAccount = async () => {
    return await axios.get('/api/admin/get-all-account')
}

const fetchOneAccount = async (username) =>{
    return await axios.post('/api/admin/get-one-account',{
        username
    })
}

export {
    fetchAccount, 
    fetchOneAccount
}