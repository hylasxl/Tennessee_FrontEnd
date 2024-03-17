import axios from '../setup/axios'


const fetchLecturerByLanguage = async (languageId, startDate, classShift, weekdays,courseId) => {
    return await axios.post('/api/lecturer/fetch-lecturer-by-language', {
        languageId, startDate, classShift, weekdays,courseId
    })
}

const fetchClassAttendance = async(classId, lecturerId)=>{
    return await axios.post('/api/lecturer/fetch-class-attendance',{
        classId,lecturerId
    })
}

const checkAttendance = async (attendanceData)=>{
    return await axios.put('/api/lecturer/check-attendance',{
        attendanceData
    })
}

const fetchClassAcademicTranscript = async (classId)=>{
    return await axios.post('/api/lecturer/fetch-class-academic-transcipt',{
        classId
    })
}

const saveAcademicTranscript = async(transcriptData)=>{
    return await axios.put('/api/lecturer/save-academic-transcript',{
        transcriptData
    })
}

export {
    fetchLecturerByLanguage,
    fetchClassAttendance,
    checkAttendance,
    fetchClassAcademicTranscript,
    saveAcademicTranscript
}