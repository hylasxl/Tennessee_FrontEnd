
import { useState, useMemo, useEffect, useCallback, useContext, useRef } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { fetchAllList } from '../../service/lecturerAccountList';

const LecturerAccountListTable = (props) => {
    const [lecturerList, setLecturerList] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const handleFetchAllLecturer = async () => {
        return await fetchAllList()
    }

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
        ]
    })

    return (
        <div>
            <MaterialReactTable table={table} />
        </div>
    );
}
export default LecturerAccountListTable