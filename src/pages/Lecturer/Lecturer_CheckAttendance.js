import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Checkbox from '@mui/material/Checkbox';

const LecturerCheckAttendance = () => {
    const [students, setStudents] = useState([
        { id: 1, name: 'John Doe', attendance: false },
        { id: 2, name: 'Jane Doe', attendance: false },
        // Add more students as needed
    ]);

    const handleAttendanceChange = (id) => {
        setStudents(students.map(student =>
            student.id === id ? { ...student, attendance: !student.attendance } : student
        ));
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        {
            field: 'attendance',
            headerName: 'Attendance',
            width: 200,
            renderCell: (params) => (
                <Checkbox
                    checked={params.value}
                    onChange={() => handleAttendanceChange(params.row.id)}
                />
            ),
        },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={students} columns={columns} pageSize={5} />
        </div>
    );
};

export default LecturerCheckAttendance;
