
import { useState, useMemo, useEffect, useCallback, useContext, useRef } from 'react';
import { fetchAccount } from '../../service/accountService'
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { MenuItem, ListItemIcon } from '@mui/material';
import { AccountCircle, Send } from '@mui/icons-material';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import { useNavigate } from 'react-router-dom';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { fetchAccountByType } from '../../service/accountService';
import { UserContext } from '../../context/UserContext';

const AccountTable = (props) => {
    
    const DEFAULT_ACCOUNT_TYPE_ID = 0
    const isHighLevel = props.isHighLevel
    const { user } = useContext(UserContext)
    const [allUserData, setAllUserData] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    let currentAccessAccountTypeId = useRef(DEFAULT_ACCOUNT_TYPE_ID)
    
    const accountType = props.accountType || "all";
    const navigate = useNavigate()
    
    const genderList = ['Male', 'Female', 'Other']
    const accountTypeList = ['Admin', 'Educational Affair', 'Lecturer', 'Student']
    const accountStateList = ['Accessible', 'Restricted']

    const handleFetchAllUserAccount = useCallback(async () => {
        if (accountType === "all") {
            return await fetchAccount();
        }
        else {
            return await fetchAccountByType(accountType)
        }

    }, [accountType])

    useEffect(() => {
        if (user && user.user && user.user.userPermissions) {
            currentAccessAccountTypeId.current = user.user.userPermissions.id || DEFAULT_ACCOUNT_TYPE_ID
            console.log(currentAccessAccountTypeId.current);
        }
    }, [user])

    useEffect(() => {
        if (!isLoad) {
            handleFetchAllUserAccount().then((res) => {
                const waitTime = Math.floor(Math.random() * (2000 - 250) + 250)
                console.log(waitTime);
                setTimeout(() => {
                    let data = res.DT
                    if(isHighLevel){
                        data = data.filter(item => item.accountType.id !== 3 && item.accountType.id !== 4);
                    }
                    setAllUserData(data)
                    setIsLoad(true)
                    
                }, waitTime)
            })
        }
    }, [isLoad, handleFetchAllUserAccount])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                enableColumnFilter: false,
                size: 10
            },
            {
                accessorKey: 'username',
                header: 'Username',
                size: 10
            },
            {
                accessorKey: 'accountType.typeName',
                header: 'AccountType',
                size: 20,
                filterVariant: 'multi-select',
                filterSelectOptions: accountTypeList,
            },

            {
                accessorKey: 'account_info.firstName',
                header: 'First Name',
                size: 40
            },
            {
                accessorKey: 'account_info.lastName',
                header: 'Last Name',
                size: 40
            },
            {
                accessorKey: 'account_info.email',
                header: 'Email',
                size: 100
            },
            {
                accessorKey: 'account_info.dateofBirth',
                header: 'Date of Birth',
                sortingFn: 'datetime',
                size: 50
            },
            {
                accessorKey: 'account_info.gender',
                header: 'Gender',
                filterVariant: 'multi-select',
                filterSelectOptions: genderList,
                size: 20
            },
            {
                accessorKey: 'account_info.address',
                header: 'Address',
                size: 300
            },
            {
                accessorKey: 'account_info.phone',
                header: 'Phone',
                size: 20
            },
            {
                accessorKey: 'accountState',
                header: 'Account State',
                size: 20,
                filterVariant: 'multi-select',
                filterSelectOptions: accountStateList,
            },

        ],
        [],
    );

    

    const table = useMaterialReactTable({
        columns,
        data: allUserData,
        enableStickyHeader: true,
        initialState: { columnPinning: { left: ['mrt-row-actions'] } },
        enableRowActions: true,
        state: {
            isLoad,
            showProgressBars: !isLoad
        },
        isMultiSortEvent: () => true,
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <MenuItem
                key={0}
                onClick={() => {

                    navigate(`/admin/account/user-info/${row.getValue('username')}`)
                    closeMenu();
                }}
                sx={{ m: 0 }}
            >
                <ListItemIcon>
                    <AccountCircle />
                </ListItemIcon>
                View Profile
            </MenuItem>,
            <MenuItem
                key={2}
                onClick={() => {

                    closeMenu();
                }}
                sx={{ m: 0, display: row.getValue('accountState') === "Accessible" && +currentAccessAccountTypeId.current === 1 ? "inline-block" : "none" }}
            >
                <ListItemIcon>
                    <DoDisturbIcon />
                </ListItemIcon>
                Restrict
            </MenuItem>,
            <MenuItem
                key={3}
                onClick={() => {

                    closeMenu();
                }}
                sx={{ m: 0, display: row.getValue('accountState') === "Restricted" && +currentAccessAccountTypeId.current === 1 ? "inline-block" : "none" }}
            >
                <ListItemIcon>
                    <SettingsBackupRestoreIcon />
                </ListItemIcon>
                Restore Functions
            </MenuItem>,
        ]
    })

    return (
        <div>
            <MaterialReactTable table={table} />
        </div>
    );
}
export default AccountTable