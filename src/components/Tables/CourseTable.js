import { useState, useEffect, useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { MenuItem, ListItemIcon } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { fetchAllCourse } from "../../service/courseService";
import { Box, Typography } from '@mui/material';
import { forEach } from "lodash";
import { Rocket } from "@mui/icons-material";


const CourseTable = (props) => {
    const navigate = useNavigate();
    const [allCourse, setAllCourse] = useState([])
    const [isLoad, setIsLoad] = useState(false)


    const handleGetAllCourse = async () => {
        return await fetchAllCourse();
    }

    const Status = ['Approved', 'RequestForEditting', 'Pending', 'Rejected']

    useEffect(() => {
        if (!isLoad) {
            handleGetAllCourse().then((res) => {
                setAllCourse(res.DT)
                setIsLoad(true)

            })
        }
    }, [isLoad])

    const sortingFns = {
        approveStatus: (row1, row2) => {
            return Status.indexOf(row1.approveStatus) - Status.indexOf(row2.approveStatus);
        },
    };

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
                filterSelectOptions: Status,
            },
            {
                accessorKey: 'description',
                header: 'Description',
                size: 100
            },

        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: allCourse,
        enableColumnOrdering: true,
        enableStickyHeader: true,
        enableColumnPinning: true,
        sortingFns,
        enableExpandAll: false, //disable expand all button
        initialState: {
            columnPinning: { left: ['mrt-row-actions','id'] },
            sorting: [
                {
                    id: 'approveStatus',
                    desc: false
                }
            ]
        },
        enableRowActions: true,

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
                        gridTemplateColumns: '1fr',
                        width: '100%',
                    }}
                >
                    {lessons.map((lessons, index) => (
                        <div key={index}>
                        <Typography>Lesson #{lessons.orderofLesson}: {lessons.lessonName}</Typography>
                        </div>
                    ))}
                </Box>
            );
        }
    })

    return (
        <>
            <div>
                <MaterialReactTable table={table} />
            </div>
        </>
    )
}


export default CourseTable;