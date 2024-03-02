import { useState, useEffect, useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { getAllClass } from "../../service/classService";

const ClassTable = (props) => {

    const [allClass, setAllClass] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const shiftProcessingFn = (shift) => {
        if(+shift === 1) return "07:00:00 - 11:00:00"
        if(+shift === 2) return "13:00:00 - 17:00:00"
        if(+shift === 3) return "19:00:00 - 22:00:00"
    }

    const handleGetAllClass = async () => {
        return await getAllClass()
    }


    useEffect(() => {
        if (!isLoad) {
            handleGetAllClass().then((res) => {
                setAllClass(res.DT)
                setIsLoad(true)

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
                accessorKey: 'maxQuantity',
                header: 'Quantity',
                size: 10
            },
            {
                accessorKey: 'currentQuantity',
                header: 'Current Quantity',
                size: 10
            },
            {
                accessorKey: 'classShift',
                header: 'Shift',
                size: 10
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 40
            }
        ], []
    );

    const table = useMaterialReactTable({
        columns,
        data: allClass,
        enableColumnOrdering: true,
        enableColumnPinning: true,
        enableStickyHeader: true,
        enableRowActions: true,
        initialState: {
            columnPinning: { left: ['mrt-row-actions', 'id'] }
        },
        isMultiSortEvent: () => true,

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