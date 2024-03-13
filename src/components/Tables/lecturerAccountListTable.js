
import { useState, useMemo, useEffect, useContext } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { fetchAllList } from '../../service/lecturerAccountListService';
import { MenuItem, ListItemIcon } from "@mui/material";
import { DoneAll, Close } from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";
import { lecturerApprove } from '../../service/lecturerAccountListService';
import { toast } from "react-toastify";

const LecturerAccountListTable = (props) => {
    const controlType = props.controlType;

    const { user } = useContext(UserContext);
    const currentUserId = user.user.userId;


    const [lecturerList, setLecturerList] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const handleFetchAllLecturer = async () => {
        return await fetchAllList()
    }

    
    const handleLecturerApporve = async (currentId, lecturerId, approveType) => {
        return await lecturerApprove(currentId, lecturerId, approveType);
    };

    const statusFilter = ['Pending','Approved','Rejected']

    useEffect(() => {
        if (!isLoad) {
            handleFetchAllLecturer().then((res) => {
                const waitTime = Math.floor(Math.random() * (2000 - 250) + 250)
                setTimeout(() => {
                    setLecturerList(res.DT)
                    setIsLoad(true)
                }, waitTime)
            })
        }
    }, [isLoad])

    const columns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                enableColumnFilter: false,
                size: 10
            },
            {
                accessorFn: (row) => `${row.firstName} ${row.lastName}`,
                header: 'Full Name',
                size: 30
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size: 40
            },
            {
                accessorKey: 'LAPRLanguage.languageName',
                header: 'Language',
                size: 20
            },
            {
                accessorKey: 'LAPRAcademicRank.levelName',
                header: 'Academic Rank',
                size: 30
            },
            {
                accessorKey: 'gender',
                header: 'Gender',
                size: 10
            },
            {
                accessorKey: 'dateofBirth',
                header: 'Date of Birth',
                size: 10
            },
            {
                accessorKey: 'phone',
                header: 'Phone',
                size: 10
            },
            {
                accessorKey: 'approveStatus',
                header: 'Status',
                size: 10,
                filterVariant: 'multi-select',
                filterSelectOptions: statusFilter,

            },
            {
                accessorFn: (row) => `${row.LAPRByAccount.firstName} ${row.LAPRByAccount.lastName}`,
                header: 'Created By',
                size: 40
            },
            {
                accessorFn: (row) => row.LAPRConfirmedBy === null ? "Pending" : `${row.LAPRConfirmedBy.firstName} ${row.LAPRConfirmedBy.lastName}`,
                header: 'Confirmed By',
                size: 40
            }
        ],
        [],
    );



    const table = useMaterialReactTable({
        columns,
        data: lecturerList,
        enableStickyHeader: true,
        initialState: { 
            columnPinning: { left: ['mrt-row-actions','id'] } ,
            sorting: [{ id: 'approveStatus', desc: true }],
        },
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
                const approveType = "Approve";
                const sendRequest = async () => {
                    return new Promise((resolve, reject) => {
                        handleLecturerApporve(currentUserId, row.getValue("id"), approveType)
                            .then((res) => {
                                if (res && res.EC === 1) {
                                    resolve()
                                } else {
                                    reject()
                                }
                            });
                    })
                }
                const promise = sendRequest()
                toast.promise(promise, {
                    pending: 'Sending Request',
                    success: 'Approve Successfully',
                    error: 'Error when fetching',
                })

                closeMenu();
            }}
            sx={{ display: controlType === "Admin" && row.getValue('approveStatus') === "Pending" ? "block" : "none" }}
        >
            <ListItemIcon>
                <DoneAll />
                Approve
            </ListItemIcon>
        </MenuItem>,
        <MenuItem
            key={1}
            onClick={() => {
                const approveType = "Reject";
                const sendRequest = async () => {
                    return new Promise((resolve, reject) => {
                        handleLecturerApporve(currentUserId, row.getValue("id"), approveType)
                            .then((res) => {
                                if (res && res.EC === 1) {
                                    resolve()
                                } else {
                                    reject()
                                }
                            });
                    })
                }
                const promise = sendRequest()
                toast.promise(promise, {
                    pending: 'Sending Request',
                    success: 'Reject Successfully',
                    error: 'Error when fetching',
                })

                closeMenu();
            }}
            sx={{ display: controlType === "Admin" && row.getValue('approveStatus') === "Pending" ? "block" : "none" }}
        >
            <ListItemIcon>
                <Close />
                Reject
            </ListItemIcon>
        </MenuItem>,
        ]
    })

    return (
        <div>
            <MaterialReactTable table={table} />
        </div>
    );
}
export default LecturerAccountListTable