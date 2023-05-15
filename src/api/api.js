import axios from 'axios';
import cookie from 'cookie';
import { setCookie } from './cookie';
const URL = 'http://localhost:3000';

export const signup = async (info) => {
    const res = await axios
        .post(`${URL}/auth/signup`, info)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
};

export const login = async (info) => {
    const res = await axios
        .post(`${URL}/auth/signin`, info)
        .then(function (response) {
            console.log('Ok...');
            const dt = response.data;
            console.log(dt);
            setCookie('user_id', dt.id, 30);
            setCookie('garden_id', dt.garden_id, 30);
            return dt;
        })
        .catch(function (error) {
            console.log('Error...');
            console.log(error);
            return error.response;
        });
    return res;
};

export const logout = () => {
    setCookie('user_id', '', 0);
};

export const getLastClimateByType = async (type) => {
    const res = await axios.get(`${URL}/climates/last/${type}`);
    return res.data;
};

export const getUserByID = async (user_id) => {
    const response = await axios.get(`${URL}/auth/${user_id}`);
    return response.data;
};

export const createSchedule = async (info) => {
    const res = await axios
        .post(`${URL}/schedule`, info)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
};

export const sendData = async (data) => {
    await axios
        .post(`${URL}/climates`, data)
        .then((res) => console.log('Data send'))
        .catch((err) => console.log(err.data));
};

export const getTheLastData = async (type) => {
    return (await axios.get(`${URL}/climates/last/${type}`)).data;
};

export const getLastScheduleByType = async (garden_id, type) => {
    return (await axios.get(`${URL}/schedule/${garden_id}/${type}`)).data;
};

export const getStatusByName = async (name) => {
    return (await axios.get(`${URL}/device/${name}`)).data;
};

export const toggleDeviceDB = async (name, status) => {
    await axios
        .patch(`${URL}/device/${name}`, { name, status })
        .then((res) => console.log('Data send'))
        .catch((err) => console.log(err.data));
};

export const getModeGarden = async (garden_id, type) => {
    return (await axios.get(`${URL}/mode_garden/${garden_id}/${type}`)).data;
};

export const createModeGarden = async (info) => {
    const res = await axios
        .post(`${URL}/mode_garden`, info)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
};

export const updateModeGarden = async (info) => {
    const res = await axios
        .patch(`${URL}/mode_garden`, info)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
};

export const updateStatusSchedule = async (info) => {
    console.log(info.garden_id, info.type, info.status);
    const res = await axios
        .patch(`${URL}/schedule/${info.garden_id}/${info.type}`, {
            status: info.status
        })
        .then(function (response) {
            console.log("Heree");
            return response;
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
    return res;
};

export const sendNoti = async (data) => {
    await axios
        .post(`${URL}/notification`, data)
        .then((res) => console.log('Successful push noti to database'))
        .catch((err) => console.log(err.data));
};
