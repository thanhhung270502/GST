import axios from 'axios';

export var subdataHumid = [];

export var meanHumid = 0;

const garden_id = 'gar00000-0000-0000-0000-000000000001';

const url = `http://localhost:3000/climates/${garden_id}/humi`;

const getSubHumid = async () => {
    await axios
        .get(`${url}`)
        .then(function (res) {
            for (var i = 0; i < res.data.length; i++) {
                if (i === 10) {
                    break;
                }
                subdataHumid[i] = res.data[i];
                meanHumid += Number(res.data[i].value);
            }
            meanHumid = res.data.length < 10 ? meanHumid / res.data.length : meanHumid / 10;
        })
        .catch(function (err) {
            console.log(err);
        });
};

getSubHumid();
