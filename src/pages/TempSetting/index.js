import { useEffect, useRef, useState } from 'react';
import './setting.scss';
import data from './setting.json';

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
