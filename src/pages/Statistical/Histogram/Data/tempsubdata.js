import axios from 'axios';

export var subdataTemp = [];

export var meanTemp = 0;

const url = 'http://localhost:3000/climates/temp';

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
