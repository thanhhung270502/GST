import { useEffect, useRef, useState } from 'react';
import './setting.scss';
import data from './setting.json';
import { $, $$ } from 'jquery';
import Mode from './mode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDropletSlash, faLightbulb, faSeedling, faTemperature3 } from '@fortawesome/free-solid-svg-icons';

function Setting() {
    const [temp, setTemp] = useState(true);
    const [light, setLight] = useState(false);
    const [humi, setHumi] = useState(false);
    const [soil, setSoil] = useState(false);

    const [type, setType] = useState('temp');

    const handleTemp = () => {
        setTemp(true);
        setLight(false);
        setHumi(false);
        setSoil(false);
        setType('temp');
    };
    const handleLight = () => {
        setTemp(false);
        setLight(true);
        setHumi(false);
        setSoil(false);
        setType('light');
    };
    const handleHumi = () => {
        setTemp(false);
        setLight(false);
        setHumi(true);
        setSoil(false);
        setType('humi');
    };
    const handleSoil = () => {
        setTemp(false);
        setLight(false);
        setHumi(false);
        setSoil(true);
        setType('soil');
    };

    const [mode, setMode] = useState('auto');

    const handleChangeMode = (event) => {
        setMode(event.target.value);
    };

    return (
        <div className="temp-setting">
            <div className="d-flex">
                <div className="col-3 sidebar">
                    <div className="title">Setting</div>
                    <div className="menu">
                        {temp && (
                            <li onClick={handleTemp} value="temp" className="sidebar-item item-active">
                                <div href="#" className="sidebar-link">
                                    <span>
                                        <FontAwesomeIcon icon={faTemperature3} />
                                    </span>{' '}
                                    Temperature
                                </div>
                            </li>
                        )}
                        {!temp && (
                            <li onClick={handleTemp} className="sidebar-item">
                                <div href="#" className="sidebar-link">
                                    <span>
                                        <FontAwesomeIcon icon={faTemperature3} />
                                    </span>{' '}
                                    Temperature
                                </div>
                            </li>
                        )}
                        {light && (
                            <li onClick={handleLight} className="sidebar-item item-active">
                                <div href="#" className="sidebar-link">
                                    <span>
                                        <FontAwesomeIcon icon={faLightbulb} />
                                    </span>{' '}
                                    Lighting
                                </div>
                            </li>
                        )}
                        {!light && (
                            <li onClick={handleLight} className="sidebar-item">
                                <div href="#" className="sidebar-link">
                                    <span>
                                        <FontAwesomeIcon icon={faLightbulb} />
                                    </span>{' '}
                                    Lighting
                                </div>
                            </li>
                        )}
                        {humi && (
                            <li onClick={handleHumi} className="sidebar-item item-active">
                                <div href="#" className="sidebar-link">
                                    <span>
                                        <FontAwesomeIcon icon={faDropletSlash} />
                                    </span>{' '}
                                    Humidity
                                </div>
                            </li>
                        )}
                        {!humi && (
                            <li onClick={handleHumi} className="sidebar-item">
                                <div href="#" className="sidebar-link">
                                    <span>
                                        <FontAwesomeIcon icon={faDropletSlash} />
                                    </span>{' '}
                                    Humidity
                                </div>
                            </li>
                        )}
                        {soil && (
                            <li onClick={handleSoil} className="sidebar-item item-active">
                                <div href="#" className="sidebar-link">
                                    <span>
                                        <FontAwesomeIcon icon={faSeedling} />
                                    </span>{' '}
                                    Soil Moisture
                                </div>
                            </li>
                        )}
                        {!soil && (
                            <li onClick={handleSoil} className="sidebar-item">
                                <div href="#" className="sidebar-link">
                                    <span>
                                        <FontAwesomeIcon icon={faSeedling} />
                                    </span>{' '}
                                    Soil Moisture
                                </div>
                            </li>
                        )}
                    </div>
                </div>
                <div className="col-9 d-flex main">
                    <div className="col-8 inner-main">
                        <div className="main-item">
                            {temp && <div className="title">Mode: Temperature</div>}
                            {light && <div className="title">Mode: Lighting</div>}
                            {humi && <div className="title">Mode: Humidity</div>}
                            {soil && <div className="title">Mode: Soil Moisture</div>}
                            <div className="content">
                                <select
                                    class="form-select"
                                    aria-label="Default select example"
                                    onChange={handleChangeMode}
                                >
                                    <option value="auto">Automatic</option>
                                    <option value="schedule">Schedule</option>
                                    <option value="manual">Manual</option>
                                </select>
                            </div>
                            <div className="sub-items">
                                <div className="sub-item">
                                    <Mode type={type} mode={mode} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Setting;
