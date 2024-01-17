import AdminNavigation from '../../components/Admin_Navigation/Admin_Navigation'
import {fetchAccount} from '../../service/accountService'
import { useState, useEffect } from 'react'

const AdminAccountManagementPage = (props)=>{

    const [allUserData, setAllUserData] = useState({})
    
    const handleFetchAllUserAccount = async () => {
        return await fetchAccount();
    }
    useEffect(()=>{
        const data = handleFetchAllUserAccount().then((res)=>{
            console.log(res);
        })
        setAllUserData(data)
    },[])


    
    return (<>


        <AdminNavigation/>

    </>)
}

export default AdminAccountManagementPage;