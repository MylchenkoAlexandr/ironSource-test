import Axios from "axios";
import {has} from "lodash";
import {notification} from 'antd';

const showErrorMessage = (error) => {
    return notification.error({
        message: "Network error",
        description: error.message || error
    });
}

const create = () => {
    const baseURL = `http://localhost:3000`;
    const request = Axios.create({baseURL});

    request.interceptors.request.use(config => (config));
    request.interceptors.response.use(
        (response) => {
            if (has(response, "data.error")) showErrorMessage(response.data.error);
            return response;
        },
        (error) => {
            showErrorMessage(error);
            return Promise.reject(error);
        }
    );

    return request;
}

export default create();