import './statistical.scss'
import { useState, useEffect } from 'react';
import HumidChart from './Histogram/humid-hist'  // npm install --save recharts
import TempChart from './Histogram/temp-hist'
import LightChart from './Histogram/light-hist'
import $ from 'jquery'

function Statistical() {
    var firstrender = false;

    useEffect(() => {
        // Scrool default
        $("html, body").animate({ scrollTop: 0 }, "fast");

        // Function
        function reload() {
            $("#sl-day, #sl-week, #sl-month, #sl-year").css('background-color', '#f5f5f5');
            $("#sl-day, #sl-week, #sl-month, #sl-year").css('color', '#000000');
        }
        function sethis() {
            var count = 101;
            var val;
            var i;
            $('.his-table').remove();
            var content = "<table class='his-table'> <tr> <th> ID </th> <th> Time </th> <th> Value </th> <th> Status </th> </tr>"
            for (i = 0; i < 7; i++) {
                val = 30 - Math.random() * 10;
                content += '<tr> <td> #' + count + '</td>' + '<td> 2022-03-2' + i + '</td>' + '<td>' + val + '</td>' + '<td> Normal </td> </tr>';
                count++;
            };
            content += '<table/>'
            $('.strl-history').append(content);
        }

        // Render
        var show = document.getElementsByClassName('header-section')[0];
        var sbody = document.getElementsByClassName('statis-body')[0];
        show.style.display = 'block';

        // $(window).on('scroll', function () {
        //     sbody.style.marginTop = '55px';
        // })

        if (firstrender == false) {
            var count = 101;
            var val;
            var i;
            var content = "<tr> <th> ID </th> <th> Time </th> <th> Value </th> <th> Status </th> </tr>"
            for (i = 0; i < 7; i++) {
                val = 30 - Math.random() * 10;
                content += '<tr> <td> #' + count + '</td>' + '<td> 2022-03-2' + i + '</td>' + '<td>' + val + '</td>' + '<td> Normal </td> </tr>';
                count++;
            };
            $('.his-table').append(content);
            firstrender = true;
        }

        var temp = $('.Tempchart'), light = $('.Lightchart'), humid = $('.Humidchart');

        $(".temp").on('click', function () {
            $('.light').css('background-color', '#f4faf6');
            $(this).css('background-color', 'white');
            $('.humid').css('background-color', '#f4faf6');
            temp.show();
            light.hide();
            humid.hide();
            sethis();
        });

        $(".light").on('click', function () {
            $('.temp').css('background-color', '#f4faf6');
            $(this).css('background-color', 'white');
            $('.humid').css('background-color', '#f4faf6');
            temp.hide();
            light.show();
            humid.hide();
            sethis();
        });

        $(".humid").on('click', function () {
            $('.temp').css('background-color', '#f4faf6');
            $(this).css('background-color', 'white');
            $('.light').css('background-color', '#f4faf6');
            temp.hide();
            light.hide();
            humid.show();
            sethis();
        });

        $("#sl-day").on('click', function () {
            reload();
            $("#sl-day").css('background-color', '#25b580');
            $("#sl-day").css('color', '#ffffff');
        })

        $("#sl-week").on('click', function () {
            reload();
            $("#sl-week").css('background-color', '#25b580');
            $("#sl-week").css('color', '#ffffff');
        })

        $("#sl-month").on('click', function () {
            reload();
            $("#sl-month").css('background-color', '#25b580');
            $("#sl-month").css('color', '#ffffff');
        })

        $("#sl-year").on('click', function () {
            reload();
            $("#sl-year").css('background-color', '#25b580');
            $("#sl-year").css('color', '#ffffff');
        })

    }, []);

    return (
        <div className="container-fluid statis-body">
            <div className="row">
                <div className="col-3 statis-left">
                    <p>
                        All my conditions
                    </p>
                    <div className="stl">
                        <div className="temp">
                            <div className="stl-content">
                                <div>
                                    <i class="uil uil-sun"></i>
                                    <p>Temperature</p>
                                </div>
                            </div>
                        </div>

                        <div className="light">
                            <div className="stl-content">
                                <div>
                                    <i class="uil uil-brightness-half"></i>
                                    <p>Light</p>
                                </div>
                            </div>
                        </div>

                        <div className="humid">
                            <div className="stl-content">
                                <div>
                                    <i class="uil uil-tear"></i>
                                    <p>Humidity</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-9 statis-right">
                    <div className="row">
                        <div className="col-8 str-left">
                            <div className="strl-opt">
                                <div className="row">
                                    <div className="col-2"></div>
                                    <div className='col-2' id='sl-day'>Day</div>
                                    <div className='col-2' id='sl-week'>Week</div>
                                    <div className='col-2' id='sl-month'>Month</div>
                                    <div className='col-2' id='sl-year'>Year</div>
                                    <div className="col-2"></div>
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
                                </div>
                                <div className="strl-history">
                                    <div className="histop"></div>
                                    <table className='his-table'>
                                        {/* Add table */}
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 str-right">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Statistical;