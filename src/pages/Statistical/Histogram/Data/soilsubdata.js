import axios from 'axios';

export var subdataSoil = [];

export var meanSoil = 0;

const garden_id = 'gar00000-0000-0000-0000-000000000001';

const url = `http://localhost:3000/climates/${garden_id}/soil`;

const getSubSoil = async () => {
    axios
        .get(`${url}`)
        .then(function (res) {
            for (var i = 0; i < res.data.length; i++) {
                if (i === 10) {
                    break;
                }
                subdataSoil[i] = res.data[i];
                meanSoil += Number(res.data[i].value);
            }
            meanSoil = res.data.length < 10 ? meanSoil / res.data.length : meanSoil / 10;
        })
        .catch(function (err) {
            console.log(err);
        });
};

getSubSoil();
