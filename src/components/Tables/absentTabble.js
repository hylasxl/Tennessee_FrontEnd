import { useState, useEffect, useMemo, useContext } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from 'material-react-table';
import { fetchAbsentRequest } from "../../service/lecturerService";
const AbsentTable = (props) => {


    const [allRequest, setAllRequest]=useState([])
    const [isLoad, setIsLoad] = useState(false)

    const statusSortingFn = (row1, row2) => {
        const order = ['Pending', 'Approved', 'Rejected'];
        return order.indexOf(row1.status) - order.indexOf(row2.status);
    };

    useEffect(()=>{
        fetchAbsentRequest().then((res)=>{
            console.log(res.DT);
            setAllRequest(res.DT)
            setIsLoad(true)
        })
    },[])


    const columns = useMemo(
        () => [
            {
                accessorFn: (row)=> `${row.account_info.firstName} ${row.account_info.lastName}`,
                header: 'Student',
                size: 40
            },
            {
                accessorKey:'class.className',
                header:'Class',
                size:40
            },
            {
                accessorKey:'date',
                header:'Date',
                size:10
            },
            {
                accessorKey:'reason',
                header:'Reason',
                size:40,
               
                
            },
            {
                accessorKey:'status',
                header:'Status',
                size:10,
                sortingFn: statusSortingFn
            },
            {
                accessorKey:'createdAt',
                header:'Created At',
                size:20
            },
            
        ], []
    );

    const table = useMaterialReactTable({
        columns,
        data: allRequest,
        enableStickyHeader: true,
        enableRowActions: true,
        state: {
            isLoad,
            showProgressBars: !isLoad
        },
        initialState: {
            columnPinning: { left: ['mrt-row-actions'] },
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


export default AbsentTable;