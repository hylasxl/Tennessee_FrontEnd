import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { useState, useEffect, useMemo } from 'react';
import { fetchAllRooms } from '../../service/roomService'

const RoomTable = (props) => {

    const [allRooms, setAllRooms] = useState([])
    const [isLoad, setIsLoad] = useState(false)

    const roomStateList = ['Accessible','Maintaining']

    const handleFetchAllRooms = async () => {
        return await fetchAllRooms()
    }

    useEffect(() => {
        if (!isLoad) {
            handleFetchAllRooms().then((res) => {
                const waitTime = Math.floor(Math.random() * (2000 - 250) + 250)
                setTimeout(() => {
                    setAllRooms(res.DT)
                    setIsLoad(true)
                },waitTime)
            })
        }
    }, [isLoad])

    const columns = useMemo(
        ()=>[
            {
                accessorKey: 'id',
                header: 'ID',
                size: 10
            },
            {
                accessorKey: 'roomName',
                header: 'Room',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                filterVariant: 'multi-select',
                filterSelectOptions: roomStateList,
            },
            {
                accessorKey: 'description',
                header: 'Description',
            },
        ]
    )

    const table = useMaterialReactTable({
        columns,
        data: allRooms,
        enableStickyHeader: true,
        enableRowActions: true,
        state: {
            isLoad,
            showProgressBars: !isLoad
        },
        initialState: {
            columnPinning: { left: ['mrt-row-actions', 'id'] },
            sorting: [
                {
                    id: 'status',
                    desc: false
                }
            ]
        },

        isMultiSortEvent: () => true,

    })

    return (<>
        <MaterialReactTable table={table}/>
    </>)
}

export default RoomTable;