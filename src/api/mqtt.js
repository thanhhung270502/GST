// Set up MQTT client

const AIO_FEED_ID = ["gst-humi", "gst-light", "gst-soil", "gst-temp"];
const AIO_USERNAME = "vienminhphuc";
const AIO_KEY = "aio_tSnc16tAq4ZWzk0HJKJlz9n3W1Ox";
const AIO_BASE_URL = "https://io.adafruit.com/api/v2/";
const temp = -1;
const humi = -1;
const light = -1;
const soil = -1;
const TIMEOUT_MS = 10000; // Timeout for waiting for new data in ms
let lastTimestamp = 0;
let timeoutId = null;
let messagePrinted = false;

let getHumi = () => {
    const url = AIO_BASE_URL + AIO_USERNAME + "/feeds/" + AIO_FEED_ID[0] + "/data";
    fetch(url, {
        headers: {
            "X-AIO-Key": AIO_KEY,
            "Content-Type": "application/json",
        },
    })
        .then(response => response.json())
        .then(data => {
            const humi = data[0].value;
            const date = new Date(data[0].created_epoch * 1000);
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            const seconds = date.getSeconds().toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const year = date.getFullYear().toString();
            const formattedTimestamp = ${ hours }: ${ minutes }: ${ seconds } ${ day }/${month}/${ year };
            if (data.length == lastTimestamp) {
                if (!messagePrinted) {
                    timeoutId = setTimeout(() => {
                        document.getElementById("value").innerHTML += "No data received. Waiting..." + "<br>";
                        clearTimeout(timeoutId);

                    }, TIMEOUT_MS);

                }
                messagePrinted = true;
            }
            else {
                clearTimeout(timeoutId);
                document.getElementById("value").innerHTML += Humi: ${ humi }, Time: ${ formattedTimestamp } + "<br>";
                lastTimestamp = data.length;
                messagePrinted = false;
            }
        })
        .catch(error => console.log(error));
}