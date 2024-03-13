import { useState, useEffect, useMemo, useContext } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { convertDays } from "../../utils/utils.function";
import { UserContext } from "../../context/UserContext";
import { fetchClassByLecturer } from "../../service/classService";

const ClassLecturerTable = (props) => {

    const [allClass, setAllClass] = useState([])
    const [isLoad, setIsLoad] = useState(false)


    const { user } = useContext(UserContext);
    const currentUserId = user.user.userId;

    const handleGetAllClass = async (id) => {
        return await fetchClassByLecturer(id)
    }

    useEffect(() => {
        if (!isLoad && currentUserId) {
            handleGetAllClass(currentUserId).then((res) => {
                const waitTime = Math.floor(Math.random() * (2000 - 250) + 250)
                setTimeout(() => {
                    setAllClass(res.DT)
                    setIsLoad(true)
                }, waitTime)
            })
        }
    }, [isLoad, currentUserId])


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
                accessorFn: (row) => `${row.lecturerByAccount.firstName} ${row.lecturerByAccount.lastName}`,
                header: 'Lecturer',
                size: 20
            },
            {
                accessorFn: (row) => `${row.class_classShift.startTime} - ${row.class_classShift.endTime}`,
                header: 'Shift',
                size: 40
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
            columnPinning: { left: ['mrt-row-actions', 'id'] },
        },
        isMultiSortEvent: () => true,
        renderRowActionMenuItems: ({ closeMenu, row }) => [
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


export default ClassLecturerTable;