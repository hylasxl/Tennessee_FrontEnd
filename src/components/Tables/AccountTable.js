
import { useState, useMemo, useEffect } from 'react';
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

const AccountTable = () => {


    const navigate = useNavigate()
    const [allUserData, setAllUserData] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const handleFetchAllUserAccount = async () => {
        return await fetchAccount();
    }

    useEffect(() => {
        if (!isLoad) {
            handleFetchAllUserAccount().then((res) => {
                setAllUserData(res.DT)
                setIsLoad(true)
            })
        }
    }, [isLoad])

    const genderList = ['Male', 'Female', 'Other']
    const accountTypeList = ['Admin', 'Educational Affair', 'Lecturer', 'Student']
    const accountStateList = ['Accessible', 'Restricted']

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
        enableColumnOrdering: true,
        enableStickyHeader: true,
        enableColumnPinning: true,
        initialState: { columnPinning: { left: ['mrt-row-actions'] } },
        enableRowActions: true,
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
                key={1}
                onClick={() => {
                    // Send email logic...
                    closeMenu();
                }}
                sx={{ m: 0 }}
            >
                <ListItemIcon>
                    <Send />
                </ListItemIcon>
                Send Email
            </MenuItem>,
            <MenuItem
                key={1}
                onClick={() => {

                    closeMenu();
                }}
                sx={{ m: 0, display: row.getValue('accountState') === "Accessible" ? "inline-block" : "none" }}
            >
                <ListItemIcon>
                    <DoDisturbIcon />
                </ListItemIcon>
                Restrict
            </MenuItem>,
            <MenuItem
                key={1}
                onClick={() => {

                    closeMenu();
                }}
                sx={{ m: 0, display: row.getValue('accountState') === "Restricted" ? "inline-block" : "none" }}
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