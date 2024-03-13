import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useParams } from 'react-router-dom';
import qs from "qs"
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

import { countLecturerRequest } from '../../../service/lecturerAccountListService';
import { countStudentRequest } from '../../../service/studentAccountListService';
import { countCourseRequest } from '../../../service/courseService';
import { countClassRequest } from '../../../service/classService'


const AdminNavigation = (props) => {
    const params = useParams()
    const username = params.username || '';
    const courseDetailUrl = params.data || '';

    const [studentRequest, setStudentRequest] = useState()
    const [lecturerRequest, setLecturerRequest] = useState()
    const [courseRequest, setCourseRequest] = useState()
    const [classRequest, setClassRequest] = useState()

    let searchParams = qs.parse(courseDetailUrl)
    searchParams = qs.stringify(searchParams)

    const StyledBadge = withStyles((theme) => ({
        badge: {
            right: -1,
            top: 13,
        },
    }))(Badge);
    const handleFetchStudentRequest = async () => {
        return await countStudentRequest()
    }

    const handleFetchLecturerRequest = async () => {
        return await countLecturerRequest()
    }
    const handleFetchCourseRequest = async () => {
        return await countCourseRequest()
    }
    const handleFetchClassRequest = async () => {
        return await countClassRequest()
    }

    useEffect(() => {
        handleFetchLecturerRequest().then((res) => {
            setLecturerRequest(res.DT)
        })
        handleFetchStudentRequest().then((res) => {
            setStudentRequest(res.DT)
        })
        handleFetchCourseRequest().then((res) => {
            setCourseRequest(res.DT)
        })
        handleFetchClassRequest().then((res)=>{
            setClassRequest(res.DT)
        })
    }, [])

    const AccountManagementChildrens = ['/admin/account', `/admin/account/user-info/${username}`]
    const CourseManagementChildrens = ['/admin/course', `/admin/course/detail/${searchParams}`]
    const LecturerManagementChildrens = ['/admin/lecturer-request']
    const StudentManagementChildrens = ['/admin/student-request']
    const ClassManagementChildrens = ['/admin/class']

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark" sticky='top'>
                <Container>
                    <Navbar.Brand href="/">Home</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/admin/account" className={AccountManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Accounts</Nav.Link>
                        <div>
                            <StyledBadge overlap='rectangular' badgeContent={courseRequest} color='secondary'>
                                <span>
                                    <Nav.Link href="/admin/course" className={CourseManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Course Requests</Nav.Link>
                                </span>
                            </StyledBadge>
                        </div>
                        <div style={{ paddingLeft: '10px' }}>
                            <StyledBadge overlap='rectangular' badgeContent={classRequest} color='secondary'>
                                <span>
                                    <Nav.Link href="/admin/class" className={ClassManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Class Requests</Nav.Link>
                                </span>
                            </StyledBadge>
                        </div>
                        <div style={{ paddingLeft: '10px' }}>
                            <StyledBadge overlap='rectangular' badgeContent={lecturerRequest} color='secondary'>
                                <span>
                                    <Nav.Link href="/admin/lecturer-request" className={LecturerManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Lecturer Requests</Nav.Link>
                                </span>
                            </StyledBadge>
                        </div>
                        <div style={{ paddingLeft: '10px' }}>
                            <StyledBadge overlap='rectangular' badgeContent={studentRequest} color='secondary'>
                                <span>
                                    <Nav.Link href="/admin/student-request" className={StudentManagementChildrens.includes(window.location.pathname) ? 'active' : ''}>Student Requests</Nav.Link>
                                </span>
                            </StyledBadge>
                        </div>


                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminNavigation;