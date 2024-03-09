
import { useState, useMemo, useEffect, useCallback, useContext, useRef } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { fetchAllList } from '../../service/studentAccountListService';

const StudentAccountListTable = (props) => {
    const [studentList, setStudentList] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const handleFetchAllStudent = async () => {
        return await fetchAllList()
    }

    const statusFilter = ['Pending', 'Approved', 'Rejected']

    useEffect(() => {
        if (!isLoad) {
            handleFetchAllStudent().then((res) => {
                const waitTime = Math.floor(Math.random() * (2000 - 250) + 250)
                setTimeout(() => {
                    setStudentList(res.DT)
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
                accessorFn: (row) => `${row.SCPRByAccount.firstName} ${row.SCPRByAccount.lastName}`,
                header: 'Created By',
                size: 40
            },
            {
                accessorFn: (row) => row.SCPRConfirmedBy === null ? "Pending" : `${row.SCPRConfirmedBy.firstName} ${row.SCPRConfirmedBy.lastName}`,
                header: 'Confirmed By',
                size: 40
            }
        ],
        [],
    );



    const table = useMaterialReactTable({
        columns,
        data: studentList,
        enableStickyHeader: true,
        initialState: {
            columnPinning: { left: ['mrt-row-actions', 'id'] },
            sorting: [{ id: 'approveStatus', desc: true }],

        },
        enableRowActions: true,
        state: {
            isLoad,
            showProgressBars: !isLoad
        },
        isMultiSortEvent: () => true,
        renderRowActionMenuItems: ({ closeMenu, row }) => [
        ]
    })

    return (
        <div>
            <MaterialReactTable table={table} />
        </div>
    );
}
export default StudentAccountListTable