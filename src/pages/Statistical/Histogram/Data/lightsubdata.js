import axios from 'axios';

export var subdataLight = [];

export var meanLight = 0;

const garden_id = 'gar00000-0000-0000-0000-000000000001';

const url = `http://localhost:3000/climates/${garden_id}/light`;

const getSubLight = async () => {
    await axios
        .get(`${url}`)
        .then(function (res) {
            for (var i = 0; i < res.data.length; i++) {
                if (i === 10) {
                    break;
                }
                subdataLight[i] = res.data[i];
                meanLight += Number(res.data[i].value);
            }
            meanLight = res.data.length < 10 ? meanLight / res.data.length : meanLight / 10;
        })
        .catch(function (err) {
            console.log(err);
        });
};

getSubLight();
