import axios from 'axios';

export var subdataTemp = [];

export var meanTemp = 0;

const garden_id = 'gar00000-0000-0000-0000-000000000001';

const url = `http://localhost:3000/climates/${garden_id}/temp`;

const getSubTemp = async () => {
    axios
        .get(`${url}`)
        .then(function (res) {
            for (var i = 0; i < res.data.length; i++) {
                if (i === 10) {
                    break;
                }
                subdataTemp[i] = res.data[i];
                meanTemp += Number(res.data[i].value);
            }
            meanTemp = res.data.length < 10 ? meanTemp / res.data.length : meanTemp / 10;
        })
        .catch(function (err) {
            console.log(err);
        });
};

getSubTemp();
