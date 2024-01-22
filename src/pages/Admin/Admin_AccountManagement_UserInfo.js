import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { fetchOneAccount } from "../../service/accountService";
import AdminNavigation from "../../components/Navigation/Admin_Navigation/Admin_Navigation";


const AdminAccountManagementUserInfo = () => {
    const params = useParams()
    const [username, setUsername] = useState(params.username)
    const [userData, setUserData] = useState(null)

    const handleGetUserData = async (username) => {
        const data = await fetchOneAccount(username)
        return data
    }


    useEffect(() => {
        setUsername(params.username)
        if (username) {
            handleGetUserData(username).then((res) => {
                setUserData(res.DT)
            })
        }
    }, [params, username])

    return (
        <>
            <AdminNavigation />
            {userData && (
                <div className='mt-5 ms-5 ps-3 pe-3'>
                    <h3 className="page-title" style={{textDecoration:'underline'}}>User infomation</h3>
                    <div className="table-data mt-5 d-flex flex-column gap-3">
                        <div className="data-field d-flex ">
                            <div className="field-name" style={{ color: '#1a2d59', minWidth: '200px', fontSize: '18px' }}>Account ID: </div>
                            <div className="field-data" style={{ fontSize: '18px' }}>{userData.id}</div>
                        </div>
                        <div className="data-field d-flex ">
                            <div className="field-name" style={{ color: '#1a2d59', minWidth: '200px', fontSize: '18px' }}>Account Type: </div>
                            <div className="field-data" style={{ fontSize: '18px' }}>{userData.accountType.typeName}</div>
                        </div>
                        <div className="data-field d-flex ">
                            <div className="field-name" style={{ color: '#1a2d59', minWidth: '200px', fontSize: '18px' }}>Username: </div>
                            <div className="field-data" style={{ fontSize: '18px' }}>{userData.username}</div>
                        </div>
                        <div className="data-field d-flex ">
                            <div className="field-name" style={{ color: '#1a2d59', minWidth: '200px', fontSize: '18px' }}>First Name: </div>
                            <div className="field-data" style={{ fontSize: '18px' }}>{userData.account_info.firstName}</div>
                        </div>
                        <div className="data-field d-flex ">
                            <div className="field-name" style={{ color: '#1a2d59', minWidth: '200px', fontSize: '18px' }}>Last Name: </div>
                            <div className="field-data" style={{ fontSize: '18px' }}>{userData.account_info.lastName}</div>
                        </div>
                        <div className="data-field d-flex ">
                            <div className="field-name" style={{ color: '#1a2d59', minWidth: '200px', fontSize: '18px' }}>Email: </div>
                            <div className="field-data" style={{ fontSize: '18px' }}>{userData.account_info.email}</div>
                        </div>
                        <div className="data-field d-flex ">
                            <div className="field-name" style={{ color: '#1a2d59', minWidth: '200px', fontSize: '18px' }}>Gender: </div>
                            <div className="field-data" style={{ fontSize: '18px' }}>{userData.account_info.gender}</div>
                        </div>
                        <div className="data-field d-flex ">
                            <div className="field-name" style={{ color: '#1a2d59', minWidth: '200px', fontSize: '18px' }}>Phone: </div>
                            <div className="field-data" style={{ fontSize: '18px' }}>{userData.account_info.phone}</div>
                        </div>
                        <div className="data-field d-flex ">
                            <div className="field-name" style={{ color: '#1a2d59', minWidth: '200px', fontSize: '18px' }}>Address: </div>
                            <div className="field-data" style={{ fontSize: '18px' }}>{userData.account_info.address}</div>
                        </div>
                        <div className="data-field d-flex ">
                            <div className="field-name" style={{ color: '#1a2d59', minWidth: '200px', fontSize: '18px' }}>State: </div>
                            <div className="field-data" style={{ fontSize: '18px', color: userData.accountState === "Accessible" ? "green" : "red" }}>{userData.accountState}</div>
                        </div>

                        <div className="action-field">
                            <button className="btn btn-danger" style={{display: userData.accountState ==="Accessible" ?"block":"none"}}>Restrict This Account</button>
                            <button className="btn btn-success" style={{display: userData.accountState ==="Restricted" ?"block":"none"}}>Restore This Account's Function</button>
                        </div>
                    </div>
                </div>
            )

            }
        </>
    )
}


export default AdminAccountManagementUserInfo;