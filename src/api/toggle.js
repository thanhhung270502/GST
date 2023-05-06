const AIO_KEY = 'aio_vzdq51hH08Y7zHyKkTTXSx8ubgIp';

export function toggleDevice(device, valueDevice) {
    const url = `https://io.adafruit.com/api/v2/vienminhphuc/feeds/gst-`+ device + `/data`;

    //Create a GET request with value 1 and send it to AdafruitIO
    fetch(url, {
        method: 'POST',
        headers: {
            'X-AIO-Key': AIO_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            value: valueDevice, //Turn on the fan
        }),
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
}

export const fetchItem = async (climate) => {
    const url = `https://io.adafruit.com/api/v2/vienminhphuc/feeds/gst-`+ climate +`/data`;

    await fetch(url, {
        headers: {
            'X-AIO-Key': AIO_KEY,
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((data) => {
            return data;
        })
        .catch((error) => console.log(error));
}