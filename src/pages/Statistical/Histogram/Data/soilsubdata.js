import axios from 'axios';
import { getCookie } from '~/api/cookie';

export var subdataSoil = [];

export var meanSoil = 0;

const garden_id = getCookie('garden_id');
// const garden_id = 'gar00000-0000-0000-0000-000000000001';

const url = `http://localhost:3000/climates/${garden_id}/soil`;

const getSubSoil = async () => {
    axios
        .get(`${url}`)
        .then(function (res) {
            var count = 0;
            var idx = res.data.length < 10 ? res.data.length - 1 : 9;
            for (var i = 0; i < res.data.length; i++) {
                if (i === 10) {
                    break;
                }
                subdataSoil[idx--] = res.data[res.data.length - 1 - count];
                meanSoil += Number(res.data[res.data.length - 1 - count].value);
                count++;
            }
            meanSoil = res.data.length < 10 ? meanSoil / res.data.length : meanSoil / 10;
        })
        .catch(function (err) {
            console.log(err);
        });
};

getSubSoil();
