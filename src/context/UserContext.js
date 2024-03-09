import React, { useEffect, useState } from "react"
import { getUserAccount } from "../service/userService"

const UserContext = React.createContext(null)


const UserProvider = ({children}) =>{


    const defaultValue = {
        isAuthenticated: false,
        token: '',
        user: {},
        userPermissions: {},
        
    }
    const [user, setUser] = useState(defaultValue)

    

    const loginContext = (userData) => {
        setUser(userData)
        
    }
    const logoutContext = () => {
        setUser(defaultValue)
    }

    const fetchUser = async () => {
        let data = await getUserAccount();
        if(data && data.EC === 1){
            setUser({...data.DT,isAuthenticated: true})
        } else setUser(defaultValue)
    }

    useEffect(()=>{
            fetchUser()
    },[])

    return(
        <UserContext.Provider value={{user,loginContext,logoutContext}}>
            {children}
        </UserContext.Provider>
    )

}

export {UserContext,UserProvider}