import { useState, useEffect, useMemo, useContext } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { fetchAbsentRequest } from "../../service/lecturerService";
import { MenuItem, ListItemIcon } from "@mui/material";
import { approveAbsentRequest } from "../../service/classService";
import { DoneAll, Close } from "@mui/icons-material";
import { toast } from "react-toastify";
const AbsentTable = (props) => {


    const [allRequest, setAllRequest] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    const [isUpdated, setIsUpdated] = useState(false)

    const statusSortingFn = (row1, row2) => {
        const order = ['Pending', 'Approved', 'Rejected'];
        return order.indexOf(row1.status) - order.indexOf(row2.status);
    };

    const handleApproveRequest = async (request, type) => {
        return await approveAbsentRequest(request, type)
    }

    useEffect(() => {
        setIsUpdated(false)
        fetchAbsentRequest().then((res) => {
            setAllRequest(res.DT)
            setIsLoad(true)
        })
    }, [isUpdated])


    const columns = useMemo(
        () => [
            {
                accessorFn: (row) => `${row.account_info.firstName} ${row.account_info.lastName}`,
                header: 'Student',
                size: 40
            },
            {
                accessorKey: 'class.className',
                header: 'Class',
                size: 40
            },
            {
                accessorKey: 'date',
                header: 'Date',
                size: 10
            },
            {
                accessorKey: 'reason',
                header: 'Reason',
                size: 40,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                size: 10,
                sortingFn: statusSortingFn
            },
            {
                accessorKey: 'createdAt',
                header: 'Created At',
                size: 20
            },

        ], []
    );

    const table = useMaterialReactTable({
        columns,
        data: allRequest,
        enableStickyHeader: true,
        enableRowActions: true,
        state: {
            isLoad,
            showProgressBars: !isLoad
        },
        initialState: {
            columnPinning: { left: ['mrt-row-actions'] },
        },
        isMultiSortEvent: () => true,
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <MenuItem
                key={0}
                onClick={() => {
                    const approveType = "Approve";
                    const sendRequest = async () => {
                        return new Promise((resolve, reject) => {
                            handleApproveRequest(row.original, approveType)
                                .then((res) => {
                                    if (res && res.EC === 1) {
                                        resolve()
                                    } else {
                                        reject()
                                    }
                                });
                        }).then(()=>{
                            setIsUpdated(true)
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
                sx={{ display: row.getValue('status') === "Pending" ? "block" : "none" }}
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
                            handleApproveRequest(row.original, approveType)
                                .then((res) => {
                                    if (res && res.EC === 1) {
                                        resolve()
                                    } else {
                                        reject()
                                    }
                                });
                        }).then(()=>{
                            setIsUpdated(true)
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
                sx={{ display: row.getValue('status') === "Pending" ? "block" : "none" }}
            >
                <ListItemIcon>
                    <Close />
                    Reject
                </ListItemIcon>
            </MenuItem>
        ]
    })

    return (
        <>
            <div>
                <MaterialReactTable table={table} />
            </div>
            {/* <ReactTooltip/> */}
        </>
    )
}


export default AbsentTable;