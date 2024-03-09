import axios from '../setup/axios'

const fetchAllAcademicRanks = async ()=>{
    return await axios.get('/api/academic-rank/fetch-all-academic-ranks')
}

export {
    fetchAllAcademicRanks
}