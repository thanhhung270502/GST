import axios from 'axios';

export var subdataHumid = [];

export var meanHumid = 0;

const url = 'http://localhost:3000/climates/humi';

const getSubHumid = async () => {
    await axios
        .get(`${url}`)
        .then(function (res) {
            var count = 0;
            var idx = res.data.length < 10 ? res.data.length - 1 : 9;
            for (var i = 0; i < res.data.length; i++) {
                if (i === 10) {
                    break;
                }
                subdataHumid[idx--] = res.data[res.data.length - 1 - count];
                meanHumid += Number(res.data[res.data.length - 1 - count].value);
                count++;
            }
            meanHumid = res.data.length < 10 ? meanHumid / res.data.length : meanHumid / 10;
        })
        .catch(function (err) {
            console.log(err);
        });
};

getSubHumid();
