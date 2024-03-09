import axios from "../setup/axios";


const fetchAllRooms = async () => {
    return await axios.get("/api/room/fetch-all-rooms")
}

export {
    fetchAllRooms
}