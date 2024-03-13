import { useState, useEffect, useMemo, useContext } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { getAllClass } from "../../service/classService";
import { convertDays } from "../../utils/utils.function";
import { MenuItem, ListItemIcon } from "@mui/material";
import { DoneAll, Close } from "@mui/icons-material";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { classApprove } from "../../service/classService";

const ClassTable = (props) => {

    const [allClass, setAllClass] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const controlType = props.controlType;

    const { user } = useContext(UserContext);
    const currentUserId = user.user.userId;

    const handleGetAllClass = async () => {
        return await getAllClass(props.type)
    }
    const handleClassApprove = async (currentId, classId, approveType) => {
        return await classApprove(currentId, classId, approveType)
    }

    const statusSortingFn = (row1, row2) => {
        const order = ['Pending', 'Approved', 'Rejected']; 
        return order.indexOf(row1.status) - order.indexOf(row2.status);
    };

    useEffect(() => {
        if (!isLoad) {
            handleGetAllClass().then((res) => {
                const waitTime = Math.floor(Math.random() * (2000 - 250) + 250)
                setTimeout(() => {
                    setAllClass(res.DT)
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
                size: 10
            },
            {
                accessorKey: 'className',
                header: 'Class Name',
                size: 40
            },
            {
                accessorKey: 'course.courseName',
                header: 'Course Name',
                size: 40,
                enableColumnFilter: false
            },
            {
                accessorKey: 'startDate',
                header: 'Start Date',
                size: 10,
            },
            {
                accessorKey: 'endDate',
                header: 'End Date',
                size: 10,
            },
            {
                accessorFn: (row) => `${row.lecturerByAccount.firstName} ${row.lecturerByAccount.lastName}`,
                header: 'Lecturer',
                size: 20
            },
            {
                accessorFn: (row) => `${row.currentQuantity}/${row.maxQuantity}`,
                header: 'Quantity',
                size: 5
            },
            {
                accessorFn: (row) => `${row.class_classShift.startTime} - ${row.class_classShift.endTime}`,
                header: 'Shift',
                size: 20
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 40
            }
        ], []
    );
    const sideColumns = useMemo(
        () => [
            {
                accessorKey: 'id',
                header: 'ID',
                size: 10
            },
            {
                accessorKey: 'className',
                header: 'Class Name',
                size: 40
            },
            {
                accessorKey: 'course.courseName',
                header: 'Course Name',
                size: 40,
                enableColumnFilter: false
            },
            {
                accessorKey: 'startDate',
                header: 'Start Date',
                size: 10,
            },
            {
                accessorFn: (row) => `${row.lecturerByAccount.firstName} ${row.lecturerByAccount.lastName}`,
                header: 'Lecturer',
                size: 20
            },
            {
                accessorKey: 'maxQuantity',
                header: 'Quantity',
                size: 5
            },
            {
                accessorFn: (row) => `${row.requestByAccount.firstName} ${row.requestByAccount.lastName}`,
                header: 'Request By',
                size: 5
            },
            {
                accessorFn: (row) => `${row.class_classShift.startTime} - ${row.class_classShift.endTime}`,
                header: 'Shift',
                size: 20
            },
            {
                accessorFn: (row) => `${convertDays(row.weekdays)}`,
                header: 'Weekdays',
                size: 20
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 40
            },
            {
                accessorKey: 'approveStatus',
                header: 'Status',
                size: 40,
                sortingFn: statusSortingFn,
            }
        ], []
    );

    const table = useMaterialReactTable({
        columns: props.type === "Approved" ? columns : sideColumns,
        data: allClass,
        enableStickyHeader: true,
        enableRowActions: true,
        state: {
            isLoad,
            showProgressBars: !isLoad
        },
        initialState: {
            columnPinning: { left: ['mrt-row-actions', 'id'] },
        },
        isMultiSortEvent: () => true,
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <MenuItem
                key={0}
                onClick={() => {
                    const approveType = "Approve";
                    const sendRequest = async () => {
                        return new Promise((resolve, reject) => {
                            handleClassApprove(currentUserId, row.getValue("id"), approveType)
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
                            handleClassApprove(currentUserId, row.getValue("id"), approveType)
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
        <>
            <div>
                <MaterialReactTable table={table} />
            </div>
        </>
    )
}


export default ClassTable;