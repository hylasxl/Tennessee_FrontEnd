import axios from "axios";
import { toast } from 'react-toastify'

const instance = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
})



// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


instance.interceptors.request.use(function (config) { 
    return config
},function (err){
    const status = err.response ? err.response.data : 500
    switch (status) {
        // authentication (token related issues)
        case 401: {
            toast.error("Unauthorized User. 401")
            return err;
        }

        // forbidden (permission related issues)
        case 403: {
            toast.error("You don't have permission to do this request, 403")
            return Promise.reject(err.message);
        }

        // bad request
        case 400: {
            toast.error("Bad Request. 400")
            return Promise.reject(err.message);
        }

        // not found
        case 404: {
            toast.error("Not found. 404")
            console.log(err);
            return err;
        }

        // conflict
        case 409: {
            toast.error("Conflict. 409")
            return Promise.reject(err.message);
        }

        // unprocessable
        case 422: {
            toast.error("Unprocessable. 422")
            return Promise.reject(err.message);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(err.message);
        }
    }
});

instance.interceptors.response.use(function (response) {
    return response.data
}, function (err) {

    const status = err.response ? err.response.data : 500
    switch (status) {
        // authentication (token related issues)
        case 401: {
            toast.error("Unauthorized User. 401")
            return err.response.data;
        }

        // forbidden (permission related issues)
        case 403: {
            toast.error("You don't have permission to do this request, 403")
            return Promise.reject(err.message);
        }

        // bad request
        case 400: {
            toast.error("Bad Request. 400")
            return Promise.reject(err.message);
        }

        // not found
        case 404: {
            toast.error("Not found. 404")
            return Promise.reject(err.message);
        }

        // conflict
        case 409: {
            toast.error("Conflict. 409")
            return Promise.reject(err.message);
        }

        // unprocessable
        case 422: {
            toast.error("Unprocessable. 422")
            return Promise.reject(err.message);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(err.message);
        }
    }

});

export default instance;