import axios from "axios";
import { toast } from 'react-toastify'

const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})




instance.interceptors.request.use(function (config) {
    return config
});

instance.interceptors.response.use(function (response) {
    return response.data
}, function (err) {

    const status = err.response.data
    console.log(status);
    switch (status.EC) {
        // authentication (token related issues)
        case 401: {

            toast.error("Unauthorized User")
            // toast.error("You will be redirect to login page")
            // setTimeout(() => {
            //     window.location.href = '/login'
            // }, 2000)
            return status.EM
        }

        // forbidden (permission related issues)
        case 403: {
            return status.EM
        }

        // bad request
        case 400: {
            toast.error("Bad Request")
            return status.EM
        }

        // not found
        case 404: {
            toast.error("Not found")
            return status.EM
        }

        // conflict
        case 409: {
            toast.error("Conflict")
            return status.EM
        }

        // unprocessable
        case 422: {
            toast.error("Unprocessable")
            return status.EM
        }

        // generic api error (server related) unexpected
        default: {
            return err.message
        }
    }

});

export default instance;