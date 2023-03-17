import { useEffect, useRef, useState } from 'react';
import './setting.scss';
import data from './setting.json';
import { getDataInfo } from '~/api/index';

function TempSetting() {
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    const conditions = ['Temperator', 'Lighting', 'Irrigation'];

    const [temp, setTemp] = useState(true);
    const [light, setLight] = useState(false);
    const [irri, setIrri] = useState(false);

    const handleTemp = () => {
        setTemp(true);
        setLight(false);
        setIrri(false);
    };
    const handleLight = () => {
        setTemp(false);
        setLight(true);
        setIrri(false);
    };
    const handleIrri = () => {
        setTemp(false);
        setLight(false);
        setIrri(true);
    };



    const [data, setData] = useState([]);
    
    const AIO_FEED_ID = ['gst-humi', 'gst-light', 'gst-soil', 'gst-temp'];
    const AIO_USERNAME = 'vienminhphuc';
    const AIO_KEY = 'aio_tSnc16tAq4ZWzk0HJKJlz9n3W1Ox';
    const AIO_BASE_URL = 'https://io.adafruit.com/api/v2/';

    const TIMEOUT_MS = 10000; // Timeout for waiting for new data in ms
    let lastTimestamp = 0;
    let timeoutId = null;
    let messagePrinted = false;

    const url = AIO_BASE_URL + AIO_USERNAME + '/feeds/' + AIO_FEED_ID[0] + '/data';


    useEffect(() => {
        fetch(url, {
            headers: {
                'X-AIO-Key': AIO_KEY,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setData(data);
            })
            .catch((error) => console.log(error));
    }, [])

    const showData = () => {
        console.log(data)
    }

    return (
        <div className="temp-setting">
            <div className="d-flex">
                <div className="col-3 sidebar">
                    <div className="title">Setting</div>
                    <div className="menu">
                        {temp && (
                            <li onClick={handleTemp} className="sidebar-item item-active">
                                <div href="#" className="sidebar-link">
                                    <i class="uil uil-sun"></i> Temperator
                                </div>
                            </li>
                        )}
                        {!temp && (
                            <li onClick={handleTemp} className="sidebar-item">
                                <div href="#" className="sidebar-link">
                                    <i class="uil uil-sun"></i> Temperator
                                </div>
                            </li>
                        )}
                        {light && (
                            <li onClick={handleLight} className="sidebar-item item-active">
                                <div href="#" className="sidebar-link">
                                    <i class="uil uil-brightness-half"></i> Lighting
                                </div>
                            </li>
                        )}
                        {!light && (
                            <li onClick={handleLight} className="sidebar-item">
                                <div href="#" className="sidebar-link">
                                    <i class="uil uil-brightness-half"></i> Lighting
                                </div>
                            </li>
                        )}
                        {irri && (
                            <li onClick={handleIrri} className="sidebar-item item-active">
                                <div href="#" className="sidebar-link">
                                    <i class="uil uil-tear"></i> Irrigation
                                </div>
                            </li>
                        )}
                        {!irri && (
                            <li onClick={handleIrri} className="sidebar-item">
                                <div href="#" className="sidebar-link">
                                    <i class="uil uil-tear"></i> Irrigation
                                </div>
                            </li>
                        )}
                    </div>
                </div>
                <div className="col-9 d-flex main">
                    {temp && (
                        <div className="col-8 inner-main">
                            <div className="main-item">
                                <div className="title">Sunscreen adjustment mode</div>
                                <div className="content">
                                    <select class="form-select" aria-label="Default select example">
                                        <option value="1">Automatic</option>
                                        <option value="2">Schedule</option>
                                        <option value="3">Manual</option>
                                    </select>
                                </div>
                                <div className="sub-items">
                                    <div className="sub-item">
                                        <div onClick={showData}>Click</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {light && (
                        <div className="col-8 inner-main">
                            <div className="main-item">
                                <div className="title">Mode: Light</div>
                                <div className="content">
                                    <select class="form-select" aria-label="Default select example">
                                        <option value="1">Automatic</option>
                                        <option value="2">Schedule</option>
                                        <option value="3">Manual</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                    {irri && (
                        <div className="col-8 inner-main">
                            <div className="main-item">
                                <div className="title">Mode: Irrigation</div>
                                <div className="content">
                                    <select class="form-select" aria-label="Default select example">
                                        <option value="1">Automatic</option>
                                        <option value="2">Schedule</option>
                                        <option value="3">Manual</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TempSetting;
