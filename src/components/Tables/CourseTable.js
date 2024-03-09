import { useState, useEffect, useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { fetchAllCourse } from "../../service/courseService";
import { Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import qs from "qs"

import MenuItem from "@mui/material";
import { all } from "axios";

const CourseTable = (props) => {
    const navigate = useNavigate()

    const [allCourse, setAllCourse] = useState([])
    const [isLoad, setIsLoad] = useState(false)


    const eduStatus = ['Approved', 'RequestForEditting', 'Pending', 'Rejected']
    const adminStatus = ['Pending', 'RequestForEditting', 'Approved', 'Rejected']

    const sortingFns = props.role === "edu" ? {
        approveStatus: (row1, row2) => {
            return eduStatus.indexOf(row1.approveStatus) - eduStatus.indexOf(row2.approveStatus);
        }
    } : {
        approveStatus: (row1, row2) => {
            return adminStatus.indexOf(row1.approveStatus) - adminStatus.indexOf(row2.approveStatus);
        }
    }

    const handleGetAllCourse = async () => {
        return await fetchAllCourse();
    }

    useEffect(() => {
        if (!isLoad) {
            handleGetAllCourse().then((res) => {
                const waitTime = Math.floor(Math.random() * (2000 - 250) + 250)
                setTimeout(() => {
                    setAllCourse(res.DT)
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
                size: 10,
                enableColumnFilter: false,

            },
            {
                accessorKey: 'courseName',
                header: 'Name',
                size: 40
            },
            {
                accessorKey: 'duration',
                header: 'Duration',
                size: 40
            },
            {
                accessorKey: 'price',
                header: 'Price',
                size: 40
            },
            {
                accessorKey: 'approveStatus',
                header: 'Status',
                size: 40,
                filterVariant: 'multi-select',
                filterSelectOptions: props.role === "edu" ? eduStatus : adminStatus,
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 100
            },

        ],
        []
    );

    const table = useMaterialReactTable({
        columns,
        data: allCourse,
        enableStickyHeader: true,
        sortingFns,
        enableExpandAll: true,
        enableRowActions: true,
        state: {
            isLoad,
            showProgressBars: !isLoad
        },
        initialState: {
            columnPinning: { left: ['mrt-row-actions', 'id'] },
            sorting: [
                {
                    id: 'approveStatus',
                    desc: props.role === "edu" ? false : true
                }
            ]
        },
        muiTableBodyProps: {
            sx: {

            }
        },
        muiTableBodyRowProps: ({ row }) => ({
            onClick: (event) => {
                // const data = JSON.stringify(row.original)
                const data = qs.stringify(row.original)
                if (props.role === "admin") {
                    navigate(`/admin/course/detail/${data}`)
                }

            },
            sx: {
                cursor: 'pointer', //you might want to change the cursor too when adding an onClick
            },
        }),
        isMultiSortEvent: () => true,
        renderRowActionMenuItems: ({ closeMenu, row }) => [

        ],
        muiExpandButtonProps: ({ row }) => ({
            sx: {
                transform: row.getIsExpanded() ? 'rotate(180deg)' : 'rotate(-90deg)',
                transition: 'transform 0.2s',
            },
        }),
        renderDetailPanel: ({ row }) => {
            const lessons = row.original.lessons;
            return (
                <Box
                    sx={{
                        display: 'grid',
                        margin: 'auto',
                        gridTemplateColumns: '1fr 1fr',
                        width: '75%',
                    }}
                >

                    {lessons.map((lessons, index) => (
                        <div key={index}>
                            <Typography>Lesson {lessons.orderofLesson}: {lessons.lessonName}</Typography>
                        </div>
                    ))}
                </Box>
            );
        }
    })

    return (
        <>
            <div>
                <MaterialReactTable table={table} enableStickyHeader
                    muiTableContainerProps={{ sx: { maxHeight: '50px' } }} />
            </div>
        </>
    )
}


export default CourseTable;