import { useState, useEffect, useContext } from 'react'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { fetchLecturerTimeTable } from '../../service/lecturerTimeTableService'
import { fetchStudentTimeTable } from '../../service/studentTimeTableService'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { UserContext } from '../../context/UserContext';
import { PropagateLoader } from 'react-spinners'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { convertToTwoDigitFormat } from '../../utils/utils.function'

const TimeTable = (props) => {
    const localizer = momentLocalizer(moment)
    const controlType = props.controlType

    const [eventsList, setEventList] = useState([])
    const [isLoad, setisLoad] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [eventData, setEventData] = useState({})
    const { user } = useContext(UserContext)
    const currentUserId = user.user.userId

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 3,
        borderRadius: '10px'
    };

    const handleFetchTimetable = async (id, type) => {
        if (type === 'lecturer') {
            return await fetchLecturerTimeTable(id)
        }
        if (type === 'student') {
            return await fetchStudentTimeTable(id)
        }
    }

    useEffect(() => {
        setisLoad(false)
        if (currentUserId) {
            handleFetchTimetable(currentUserId, controlType).then((res) => {
                const data = res.DT
                data.map((item) => {
                    return {
                        ...item,
                        start: new Date(item.start),
                        end: new Date(item.end)
                    }
                })
                setEventList(data)
                setTimeout(() => {
                    setisLoad(true)
                }, 1000)
            })
        }
    }, [currentUserId, controlType])




    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // This makes sure the div takes up the full height of the screen
            }}>
                {!isLoad && (
                    <PropagateLoader color='#1a2d59' />
                )}
            </div>

            {isLoad && (
                <Calendar
                    localizer={localizer}
                    events={eventsList}
                    startAccessor="start"
                    endAccessor="end"
                    popup
                    style={{ height: 600 }}
                    views={['month', 'agenda']}
                    onSelectEvent={(eventData) => {
                        setIsOpen(true)
                        setEventData(eventData)
                    }}
                />
            )}
            <Modal
                open={isOpen}
                onClose={() => {
                    setIsOpen(false)
                    setEventData({})
                }}
            >
                <Box sx={style}>
                    <Typography variant="h4" style={{ fontWeight: 'bold' }}>
                        Event Detail
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                        <p><b>Class: </b> {eventData.title}</p>
                        <p><b>Lesson: </b>{convertToTwoDigitFormat(eventData.lessonOrder)} - {eventData.lesson}</p>
                        <p><b>Time: </b>From {String(eventData.start).slice(-8)} To {String(eventData.end).slice(-8)}</p>
                        <p><b>Room: </b> {eventData.roomId}</p>
                    </Typography>
                </Box>
            </Modal>
        </>
    )
}

export default TimeTable