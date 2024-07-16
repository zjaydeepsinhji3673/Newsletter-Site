
import { request, requestForFile } from '../utils/axios.service';

/////////////////////////   ADMIN SIDE APIS    ////////////////////////////////
export const getAdminLoginData = (body) => {
    return request(`${process.env.REACT_APP_ADMIN_API}/login`, "POST", false, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const Adminlogout = () => {
    return request(`${process.env.REACT_APP_ADMIN_API}/logout`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getAllData = () => {
    return request(`${process.env.REACT_APP_ADMIN_API}/get_all_data`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const updateNEWS = (body) => {
    return request(`${process.env.REACT_APP_ADMIN_API}/update_news`, "PUT", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const AllCount = () => {
    return request(`${process.env.REACT_APP_ADMIN_API}/all_count`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
/////////////////////////   USER SIDE APIS    ////////////////////////////////

export const getUserLoginData = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/login`, "POST", false, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getRegisterUser = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/register`, "POST", false, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const Userlogout = () => {
    return request(`${process.env.REACT_APP_USER_API}/logout`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const AddNEWS = (body) => {
    return requestForFile(`${process.env.REACT_APP_USER_API}/add_news`, "POST", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getNEWS = () => {
    return request(`${process.env.REACT_APP_USER_API}/get_data`, "GET", false)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const get_news = () => {
    return request(`${process.env.REACT_APP_USER_API}/get_my_news`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
export const DELETENEWS = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/delete_news`, "PUT", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
