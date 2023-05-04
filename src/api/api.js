import axios from 'axios';
import cookie from 'cookie';
import { setCookie } from './cookie';
import React, { useEffect, useState } from 'react';
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

// const setCookie = (name, value, options = {}) => {
//     document.cookie = cookie.serialize(name, value, options);
// };

const removeCookie = (name, options = {}) => {
    document.cookie = cookie.serialize(name, '', {
        ...options,
        expires: new Date('1970-01-01T00:00:00Z'),
    });
};

export const login = async (info) => {
    const res = await axios
        .post(`${URL}/auth/signin`, info)
        .then(function (response) {
            console.log("Ok...")
            const dt = response.data;
            console.log(dt);
            setCookie('user_id', dt.id, 30);
            return dt;
        })
        .catch(function (error) {
            console.log("Error...")
            console.log(error);
            return error.response;
        });
    return res;
};
export const logout = () => {
    setCookie("user_id", '', 0);
};
const data = []

export const sendData = async(data) => {
    await axios.post(`${URL}/climates`, data)
   .then(res => console.log('Data send'))
   .catch(err => console.log(err.data))
};
