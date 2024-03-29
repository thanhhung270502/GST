import axios from 'axios';
import { getCookie } from '~/api/cookie';

export var subdataTemp = [];

export var meanTemp = 0;

const garden_id = getCookie('garden_id');
// const garden_id = 'gar00000-0000-0000-0000-000000000001';

const url = `http://localhost:3000/climates/${garden_id}/temp`;

const getSubTemp = async () => {
    axios
        .get(`${url}`)
        .then(function (res) {
            var count = 0;
            var idx = res.data.length < 10 ? res.data.length - 1 : 9;
            for (var i = 0; i < res.data.length; i++) {
                if (i === 10) {
                    break;
                }
                subdataTemp[idx--] = res.data[res.data.length - 1 - count];
                meanTemp += Number(res.data[res.data.length - 1 - count].value);
                count++;
            }
            meanTemp = res.data.length < 10 ? meanTemp / res.data.length : meanTemp / 10;
            console.log(meanTemp);
        })
        .catch(function (err) {
            console.log(err);
        });
};

getSubTemp();
