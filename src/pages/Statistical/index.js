import $ from 'jquery';
import './statistical.scss';
import { dataJson } from './data';
import { useEffect } from 'react';
import HumidChart from './Histogram/humid-hist';  // npm install --save recharts
import TempChart from './Histogram/temp-hist';
import LightChart from './Histogram/light-hist';
import SoilChart from './Histogram/soil-hist';
import RaChart from './Histogram/radar-hist';
import PChart from './Histogram/pie-hist';
import { json } from 'react-router-dom';

var pdata = dataJson();

function Statistical() {
    var firstrender = false;

    useEffect(() => {
        // Scrool default
        $("html, body").animate({ scrollTop: 0 }, "fast");

        $('.temp').addClass('stl-active');

        // Function
        function sethis() {
            var count = 101;
            var val;
            var i;
            $('.his-table').remove();
            var content = "<table class='his-table'> <tr> <th> ID </th> <th> Time </th> <th> Value </th> <th> Status </th> </tr>"
            for (i = 0; i < 11; i++) {
                val = 30 - Math.random() * 10;
                content += '<tr> <td> #' + count + '</td>' + '<td> 2022-03-2' + i + '</td>' + '<td>' + val + '</td>' + '<td> Normal </td> </tr>';
                count++;
            };
            content += '<table/>'
            $('.strl-history').append(content);
        }

        function reload() {
            if ($('#sl-day').hasClass('sl-opt-active')) {
                $('#sl-day').removeClass('sl-opt-active');
            } else if ($('#sl-week').hasClass('sl-opt-active')) {
                $('#sl-week').removeClass('sl-opt-active');
            } else if ($('#sl-month').hasClass('sl-opt-active')) {
                $('#sl-month').removeClass('sl-opt-active');
            } else if ($('#sl-year').hasClass('sl-opt-active')) {
                $('#sl-year').removeClass('sl-opt-active');
            }
        }

        function reloadHover() {
            $('.short-temp, .short-light, .short-humid, .short-soil').mouseover(function () {
                $(this).addClass('add-hover');
            });
            $('.short-temp, .short-light, .short-humid, .short-soil').mouseout(function () {
                $(this).removeClass('add-hover');
            });
            $('#sl-day, #sl-week, #sl-month, #sl-year').mouseover(function () {
                $(this).addClass('add-hover');
            });
            $('#sl-day, #sl-week, #sl-month, #sl-year').mouseout(function () {
                $(this).removeClass('add-hover');
            });
        }

        function dropdownOptShow() {
            $('.dropdown-opt').removeClass('d-none');
            $('.dropdown-opt').addClass('d-block');
            $('.dropdown-arrow').removeClass('d-none');
            $('.dropdown-arrow').addClass('d-block');
        }

        function dropdownOptHide() {
            $('.dropdown-opt').removeClass('d-block');
            $('.dropdown-opt').addClass('d-none');
            $('.dropdown-arrow').removeClass('d-block');
            $('.dropdown-arrow').addClass('d-none');
        }

        function setValue() {
            if ($('.stl-active').attr('class').split(' ')[0] === 'temp') {
                return Math.floor(Math.random() * 20) + 20;
            } else if ($('.stl-active').attr('class').split(' ')[0] === 'light') {
                return Math.floor(Math.random() * 1000) + 1000;
            } else if ($('.stl-active').attr('class').split(' ')[0] === 'humid') {
                return Math.floor(Math.random() * 20) + 30;
            } else if ($('.stl-active').attr('class').split(' ')[0] === 'soil') {
                return Math.floor(Math.random() * 50) + 50;
            };
        }

        function refreshHistogram() {
            if ($('.stl-active').attr('class').split(' ')[0] === 'temp') {
                temp.hide();
                setTimeout(function () {
                    temp.show();
                }, 50);
            } else if ($('.stl-active').attr('class').split(' ')[0] === 'light') {
                light.hide();
                setTimeout(function () {
                    light.show();
                }, 50);
            } else if ($('.stl-active').attr('class').split(' ')[0] === 'humid') {
                humid.hide();
                setTimeout(function () {
                    humid.show();
                }, 50);
            } else if ($('.stl-active').attr('class').split(' ')[0] === 'soil') {
                soil.hide();
                setTimeout(function () {
                    soil.show();
                }, 50);
            };
        }

        function setdataDay() {
            for (var i = 0; i <= 23; i++) {
                pdata[i] = {
                    id: i,
                    time: i + ":00",
                    value: setValue()
                }
            };

            refreshHistogram();
        }

        function setdataWeek() {
            // Remove data 24 hours
            for (var i = 0; i <= 23; i++) {
                pdata.splice(0, 1);
            };

            // Set data 7 days
            for (i = 0; i <= 6; i++) {
                pdata[i] = {
                    id: i,
                    time: "2" + i + "/04/2023",
                    value: setValue()
                }
            };

            refreshHistogram();
        }

        function setdataMonth() {
            // Remove data 24 hours
            for (var i = 0; i <= 23; i++) {
                pdata.splice(0, 1);
            };

            // Set data 4 weeks
            for (i = 0; i <= 3; i++) {
                pdata[i] = {
                    id: i,
                    time: "Tuần " + (i + 1),
                    value: setValue()
                }
            };

            refreshHistogram();
        }

        function setdataYear() {
            // Remove data 24 hours
            for (var i = 0; i <= 23; i++) {
                pdata.splice(0, 1);
            };

            // Set data 12 months
            for (i = 0; i <= 11; i++) {
                pdata[i] = {
                    id: i,
                    time: "Tháng " + (i + 1),
                    value: setValue()
                }
            };

            refreshHistogram();
        }

        function checkwhichOpt() {
            if ($('.sl-opt-active').attr('id') === 'sl-day') {
                return setdataDay();
            } else if ($('.sl-opt-active').attr('id') === 'sl-week') {
                return setdataWeek();
            } else if ($('.sl-opt-active').attr('id') === 'sl-month') {
                return setdataMonth();
            } else if ($('.sl-opt-active').attr('id') === 'sl-year') {
                return setdataYear();
            };
        }

        // Initial data
        for (var i = 0; i <= 23; i++) {
            pdata[i] = {
                id: i,
                time: i + ":00",
                value: setValue()
            }
        };

        // Render
        var show = document.getElementsByClassName('header-section')[0];
        show.style.display = 'block';

        if (firstrender === false) {
            var count = 101;
            var val;
            var i;
            var content = "<tr> <th> ID </th> <th> Time </th> <th> Value </th> <th> Status </th> </tr>"
            for (i = 0; i < 11; i++) {
                val = 30 - Math.random() * 10;
                content += '<tr> <td> #' + count + '</td>' + '<td> 2022-03-2' + i + '</td>' + '<td>' + val + '</td>' + '<td> Normal </td> </tr>';
                count++;
            };
            $('.his-table').append(content);
            firstrender = true;
            $('.inner__header').addClass('sticky');

        }

        // Jquery call

        var temp = $('.Tempchart'), light = $('.Lightchart'), humid = $('.Humidchart'), soil = $('.Soilchart');

        $(".temp, .short-temp").on('click', function () {
            $('.light, .humid, .soil').removeClass('stl-active');
            $(this).addClass('stl-active');

            temp.show();
            light.hide();
            humid.hide();
            soil.hide();
            sethis();

            checkwhichOpt();

            $('.short-temp').css({ 'border-top-right-radius': '15px', 'border-top-left-radius': '15px' });
            reloadHover();
            dropdownOptHide();
        });

        $(".light, .short-light").on('click', function () {
            $('.temp, .humid, .soil').removeClass('stl-active');
            $(this).addClass('stl-active');

            temp.hide();
            light.show();
            humid.hide();
            soil.hide();
            sethis();

            checkwhichOpt();

            reloadHover();
            dropdownOptHide();
        });

        $(".humid, .short-humid").on('click', function () {
            $('.light, .temp, .soil').removeClass('stl-active');
            $(this).addClass('stl-active');

            temp.hide();
            light.hide();
            humid.show();
            soil.hide();
            sethis();

            checkwhichOpt();

            reloadHover();
            dropdownOptHide();
        });

        $(".soil, .short-soil").on('click', function () {
            $('.light, .temp, .humid').removeClass('stl-active');
            $(this).addClass('stl-active');

            temp.hide();
            light.hide();
            humid.hide();
            soil.show();
            sethis();

            checkwhichOpt();

            $('.short-soil').css({ 'border-bottom-right-radius': '15px', 'border-bottom-left-radius': '15px' });
            reloadHover();
            dropdownOptHide();
        });

        $("#sl-day").on('click', function () {
            reload();

            $("#sl-day").addClass('sl-opt-active');
            reloadHover();

            // Set data 24 hour
            setdataDay();
        })


        $("#sl-week").on('click', function () {
            reload();
            $("#sl-week").addClass('sl-opt-active');
            reloadHover();

            setdataWeek();
        })

        $("#sl-month").on('click', function () {
            reload();
            $("#sl-month").addClass('sl-opt-active');
            reloadHover();

            setdataMonth();
        })

        $("#sl-year").on('click', function () {
            reload();
            $("#sl-year").addClass('sl-opt-active');
            reloadHover();

            setdataYear();
        })

        $('.slt-opt-btn').on('click', function (e) {
            if ($('.dropdown-opt').hasClass('d-none')) {
                dropdownOptShow();
            } else {
                dropdownOptHide();
            }

            $(document).on('click', function (ev) {
                if (!ev.target.classList.contains('slt-opt-btn') && !(ev.target.tagName.toLowerCase() === ('li'))) {
                    dropdownOptHide();
                }
            })
        })
    }, []);

    return (
        <div className="statis-body">
            <div className="row sbd-row">
                <div className="col-xl-3 pb-3 statis-left">
                    <p>
                        All my conditions
                    </p>
                    <div className="stl">
                        <div className="temp">
                            <div className="stl-content">
                                <div>
                                    <i className="uil uil-sun"></i>
                                    <p>Temperature</p>
                                </div>
                            </div>
                        </div>

                        <div className="light">
                            <div className="stl-content">
                                <div>
                                    <i className="uil uil-brightness-half"></i>
                                    <p>Light</p>
                                </div>
                            </div>
                        </div>

                        <div className="humid">
                            <div className="stl-content">
                                <div>
                                    <i className="uil uil-tear"></i>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>

                        <div className="soil">
                            <div className="stl-content">
                                <div>
                                    <i className="uil uil-mountains-sun"></i>
                                    <p>Soil Moisture</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-lg-12 col-xl-9 statis-right">
                    <div className="row">
                        <div className="col-md-8 str-left">
                            <div className="strl-opt">
                                <div className="row">
                                    <div className="col-md-2"></div>
                                    <div className='col-3 col-md-2 sl-opt-active' id='sl-day'>Day</div>
                                    <div className='col-3 col-md-2' id='sl-week'>Week</div>
                                    <div className='col-3 col-md-2' id='sl-month'>Month</div>
                                    <div className='col-3 col-md-2' id='sl-year'>Year</div>
                                    <div className="col-md-2"></div>
                                </div>
                            </div>
                            <div className="strl-content">
                                <div className="strl-histogram">
                                    <div className="Tempchart">
                                        <TempChart />
                                    </div>
                                    <div className="Lightchart">
                                        <LightChart />
                                    </div>
                                    <div className="Humidchart">
                                        <HumidChart />
                                    </div>
                                    <div className="Soilchart">
                                        <SoilChart />
                                    </div>
                                </div>
                                <div className="strl-history">
                                    <div className="histop"></div>
                                    <table className='his-table'>
                                        {/* Add table */}
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 str-right">
                            <RaChart />
                            <PChart />
                        </div>
                    </div>
                </div>
            </div>
            <div className='stl-opt'>
                <i className="uil uil-draggabledots slt-opt-btn"></i>
                <ul className='dropdown-opt d-none'>
                    <li className='short-temp'>Temperature</li>
                    <li className='short-light'>Light</li>
                    <li className='short-humid'>Humidity</li>
                    <li className='short-soil'>Soil Moisture</li>
                </ul>
                <div className='dropdown-arrow d-none'>
                    <i className="uis uis-triangle"></i>
                </div>
            </div>
        </div>
    )
}

export default Statistical;