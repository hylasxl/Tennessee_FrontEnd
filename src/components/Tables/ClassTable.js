import { useState, useEffect, useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { getAllClass } from "../../service/classService";

const ClassTable = (props) => {

    const [allClass, setAllClass] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const handleGetAllClass = async () => {
        return await getAllClass()
    }
    
    useEffect(() => {
        if (!isLoad) {
            handleGetAllClass().then((res) => {
                const waitTime = Math.floor(Math.random() * (2000 - 250) + 250)
                setTimeout(() => {
                    setAllClass(res.DT)
                    setIsLoad(true)
                },waitTime)
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
                accessorFn: (row)=>`${row.currentQuantity}/${row.maxQuantity}`,
                header: 'Quantity',
                size: 5
            },
            {
                accessorFn: (row)=>`${row.class_classShift.startTime} - ${row.class_classShift.endTime}`,
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

    const table = useMaterialReactTable({
        columns,
        data: allClass,
        enableStickyHeader: true,
        enableRowActions: true,
        state: {
            isLoad,
            showProgressBars: !isLoad
        },
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