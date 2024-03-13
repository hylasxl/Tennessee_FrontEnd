import { useState, useMemo, useEffect, useContext } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import { MenuItem, ListItemIcon } from "@mui/material";
import { DoneAll, Close } from "@mui/icons-material";
import { fetchAllList } from "../../service/studentAccountListService";
import { UserContext } from "../../context/UserContext";
import { studentApprove } from "../../service/studentAccountListService";
import { toast } from "react-toastify";

const StudentAccountListTable = (props) => {


    const controllType = props.controllType;

    const { user } = useContext(UserContext);
    const currentUserId = user.user.userId;

    const [studentList, setStudentList] = useState([]);
    const [isLoad, setIsLoad] = useState(false);

    const handleFetchAllStudent = async () => {
        return await fetchAllList();
    };

    const handleStudentApprove = async (currentId, studentId, approveType) => {
        return await studentApprove(currentId, studentId, approveType);
    };

    const statusFilter = ["Pending", "Approved", "Rejected"];

    useEffect(() => {
        if (!isLoad) {
            handleFetchAllStudent().then((res) => {
                const waitTime = Math.floor(Math.random() * (2000 - 250) + 250);
                setTimeout(() => {
                    setStudentList(res.DT);
                    setIsLoad(true);
                }, waitTime);
            });
        }
    }, [isLoad]);

    const columns = useMemo(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                enableColumnFilter: false,
                size: 10,
            },
            {
                accessorFn: (row) => `${row.firstName} ${row.lastName}`,
                header: "Full Name",
                size: 30,
            },
            {
                accessorKey: "email",
                header: "Email",
                size: 40,
            },
            {
                accessorKey: "gender",
                header: "Gender",
                size: 10,
            },
            {
                accessorKey: "dateofBirth",
                header: "Date of Birth",
                size: 10,
            },
            {
                accessorKey: "phone",
                header: "Phone",
                size: 10,
            },
            {
                accessorKey: "approveStatus",
                header: "Status",
                size: 10,
                filterVariant: "multi-select",
                filterSelectOptions: statusFilter,
            },
            {
                accessorFn: (row) =>
                    `${row.SCPRByAccount.firstName} ${row.SCPRByAccount.lastName}`,
                header: "Created By",
                size: 40,
            },
            {
                accessorFn: (row) =>
                    row.SCPRConfirmedBy === null
                        ? "Pending"
                        : `${row.SCPRConfirmedBy.firstName} ${row.SCPRConfirmedBy.lastName}`,
                header: "Confirmed By",
                size: 40,
            },
        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: studentList,
        enableStickyHeader: true,
        initialState: {
            columnPinning: { left: ["mrt-row-actions", "id"] },
            sorting: [{ id: "approveStatus", desc: true }],
        },
        enableRowActions: true,
        state: {
            isLoad,
            showProgressBars: !isLoad,
        },
        isMultiSortEvent: () => true,
        renderRowActionMenuItems: ({ closeMenu, row }) => [
            <MenuItem
                key={0}
                onClick={() => {
                    const approveType = "Approve";
                    const sendRequest = async () => {
                        return new Promise((resolve, reject) => {
                            handleStudentApprove(currentUserId, row.getValue("id"), approveType)
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
                sx={{ display: controllType === "Admin" && row.getValue('approveStatus') === "Pending" ? "block" : "none" }}
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
                            handleStudentApprove(currentUserId, row.getValue("id"), approveType)
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
                sx={{ display: controllType === "Admin" && row.getValue('approveStatus') === "Pending" ? "block" : "none" }}
            >
                <ListItemIcon>
                    <Close />
                    Reject
                </ListItemIcon>
            </MenuItem>,
        ],
    });

    return (
        <div>
            <MaterialReactTable table={table} />
        </div>
    );
};
export default StudentAccountListTable;
