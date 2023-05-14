import $ from 'jquery';
import axios from 'axios';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import stylesCss from './statistical.scss';
// import Data
import { dataJson } from './Histogram/Data/data';
import { meanTemp } from './Histogram/Data/tempsubdata';
import { meanLight } from './Histogram/Data/lightsubdata';
import { meanHumid } from './Histogram/Data/humidsubdata';
import { meanSoil } from './Histogram/Data/soilsubdata';
import { subdataTemp } from './Histogram/Data/tempsubdata';
import { subdataLight } from './Histogram/Data/lightsubdata';
import { subdataHumid } from './Histogram/Data/humidsubdata';
import { subdataSoil } from './Histogram/Data/soilsubdata';
import { getMainData } from './Histogram/Data/maindata';
import { getFreqData } from './Histogram/Data/freqdata';
// import Chart
import MainChart from './Histogram/MainChart';
import FreqChart from './Histogram/FreqChart';
import TempChart from './Histogram/ClimateChart/TempChart';
import LightChart from './Histogram/ClimateChart/LightChart';
import HumidChart from './Histogram/ClimateChart/HumidChart';
import SoilChart from './Histogram/ClimateChart/SoilChart';
import SubTempChart from './Histogram/SubChart/SubTempChart';
import SubLightChart from './Histogram/SubChart/SubLightChart';
import SubHumidChart from './Histogram/SubChart/SubHumidChart';
import SubSoilChart from './Histogram/SubChart/SubSoilChart';

const cx = classNames.bind(stylesCss);

const garden_id = 'gar00000-0000-0000-0000-000000000001';

var url = `http://localhost:3000/climates/${garden_id}/temp`;
var notiurl = `http://localhost:3000/notification/${garden_id}`;
var hisurl = `http://localhost:3000/history/${garden_id}`;

var pdata = dataJson();

var maindata = getMainData();

var freqdata = getFreqData();

// Function

function refreshData() {
    for (var i = 0; i <= 29; i++) {
        pdata.splice(0, 1);
    };
}

function refreshHistogram() {
    $('.statis-histogram').hide();
    setTimeout(function () {
        $('.statis-histogram').show();
    }, 50)
}

function setdataDay() {
    // Remove data 30 days
    refreshData();

    // Set data 24 hours
    axios.get(`${url}`)
        .then(function (res) {
            var notiDate = res.data[res.data.length - 1].time.split('T')[0];
            var notiHours = res.data[res.data.length - 1].time.split('T')[1].split(':')[0];
            var idx = 0;
            var count = 0;
            var mean = 0;
            for (var i = res.data.length - 1; i >= 0; i--) {
                if (idx === 23) {
                    break;
                };
                if (i === 0 && res.data[i].time.split('T')[0] === notiDate) {
                    if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                        idx++;
                    };
                    break;
                } else if (res.data[i].time.split('T')[0] !== notiDate || i === 0) {
                    break;
                };
                if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                    idx++;
                    notiHours = res.data[i].time.split('T')[1].split(':')[0];
                    i++;
                }
            };
            notiHours = res.data[res.data.length - 1].time.split('T')[1].split(':')[0];
            for (var i = res.data.length - 1; i >= 0; i--) {
                if (res.data[i].time.split('T')[0] !== notiDate || i === 0) {
                    if (i === 0) {
                        if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                            pdata[idx] = {};
                            pdata[idx].value = mean / count;
                            pdata[idx].time = notiHours + ":00:00";
                            pdata[idx - 1] = {};
                            pdata[idx - 1].value = Number(res.data[i].value);
                            pdata[idx - 1].time = res.data[i].time.split('T')[1].split(':')[0] + ":00:00";
                        } else {
                            mean += Number(res.data[i].value);
                            count++;
                            pdata[idx] = {};
                            pdata[idx].value = mean / count;
                            pdata[idx].time = notiHours;
                        };
                        break;
                    };
                    pdata[idx] = {};
                    pdata[idx].value = mean / count;
                    pdata[idx--].time = notiHours + ":00:00";
                    break;
                };
                if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                    pdata[idx] = {};
                    pdata[idx].value = mean / count;
                    pdata[idx--].time = notiHours + ":00:00";
                    notiHours = res.data[i].time.split('T')[1].split(':')[0];
                    mean = Number(res.data[i].value);
                    count = 1;
                } else {
                    mean += Number(res.data[i].value);
                    count++;
                }
            };

            console.log(url);
            console.log(pdata);
            console.log(res.data.length);
        })
        .catch(function (err) {
            console.log(err);
        });


    refreshHistogram();
}

function setdataWeek() {
    // Remove data 30 days
    refreshData();

    // Set data 7 days
    axios.get(`${url}`)
        .then(function (res) {
            var notiDate = res.data[res.data.length - 1].time.split('T')[0];
            var notiHours = res.data[res.data.length - 1].time.split('T')[1].split(':')[0];
            var idx = 0;
            for (var i = res.data.length - 1; i >= 0; i--) {
                if (idx === 6) {
                    break;
                };
                if (notiDate !== res.data[i].time.split('T')[0]) {
                    idx++;
                    notiDate = res.data[i].time.split('T')[0];
                }
            }
            notiDate = res.data[res.data.length - 1].time.split('T')[0];
            var mean = 0;
            var meanHour = 0;
            var count = 0;
            var countHour = 0;
            for (var i = res.data.length - 1; i >= 0; i--) {

                if (idx === -1) {
                    break;
                };
                if (notiDate !== res.data[i].time.split('T')[0] || i === 0) {
                    if (i === 0) {
                        if (notiHours === res.data[i].time.split('T')[1].split(':')[0]) {
                            meanHour += Number(res.data[i].value);
                            countHour++;
                        } else {
                            mean += Number(res.data[i].value);
                            count++;
                        }
                    };
                    mean += meanHour / countHour;
                    count++;
                    pdata[idx] = {};
                    pdata[idx].value = mean / count;
                    pdata[idx].time = notiDate;
                    notiDate = res.data[i].time.split('T')[0];
                    notiHours = res.data[i].time.split('T')[1].split(':')[0];
                    mean = 0;
                    if (i !== 0) {
                        i++;
                    }
                    idx--;
                    count = 0;
                    meanHour = 0;
                    countHour = 0;
                } else {
                    if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                        mean += meanHour / countHour;
                        count++;
                        countHour = 1;
                        meanHour = Number(res.data[i].value);
                        notiHours = res.data[i].time.split('T')[1].split(':')[0];
                    } else {
                        meanHour += Number(res.data[i].value);
                        countHour++;
                    };
                };

            }
        })
        .catch(function (err) {
            console.log(err);
        });

    refreshHistogram();
}

function setdataMonth() {
    // Remove data 30 days
    refreshData();

    // Set data 30 days
    axios.get(`${url}`)
        .then(function (res) {
            var notiDate = res.data[res.data.length - 1].time.split('T')[0];
            var notiHours = res.data[res.data.length - 1].time.split('T')[1].split(':')[0];
            var idx = 0;
            for (var i = res.data.length - 1; i >= 0; i--) {
                if (idx === 29) {
                    break;
                };
                if (notiDate !== res.data[i].time.split('T')[0]) {
                    idx++;
                    notiDate = res.data[i].time.split('T')[0];
                }
            };
            notiDate = res.data[res.data.length - 1].time.split('T')[0];
            var mean = 0;
            var meanHour = 0;
            var count = 0;
            var countHour = 0;
            for (var i = res.data.length - 1; i >= 0; i--) {
                if (idx === -1) {
                    break;
                };
                if (notiDate !== res.data[i].time.split('T')[0] || i === 0) {
                    if (i === 0) {
                        if (notiHours === res.data[i].time.split('T')[1].split(':')[0]) {
                            meanHour += Number(res.data[i].value);
                            countHour++;
                        } else {
                            mean += Number(res.data[i].value);
                            count++;
                        }
                    };
                    mean += meanHour / countHour;
                    count++;
                    pdata[idx] = {};
                    pdata[idx].value = mean / count;
                    pdata[idx].time = notiDate;
                    notiDate = res.data[i].time.split('T')[0];
                    notiHours = res.data[i].time.split('T')[1].split(':')[0];
                    mean = 0;
                    if (i !== 0) {
                        i++;
                    }
                    idx--;
                    count = 0;
                    meanHour = 0;
                    countHour = 0;
                } else {
                    if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                        mean += meanHour / countHour;
                        count++;
                        countHour = 1;
                        meanHour = Number(res.data[i].value);
                        notiHours = res.data[i].time.split('T')[1].split(':')[0];
                    } else {
                        meanHour += Number(res.data[i].value);
                        countHour++;
                    }
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });

    refreshHistogram();
}

function setdata3Months() {
    // Remove data 30 days
    refreshData();

    // Set data 3 months
    axios.get(`${url}`)
        .then(function (res) {
            var notiDate = res.data[res.data.length - 1].time.split('T')[0];
            var notiMonth = res.data[res.data.length - 1].time.split('-')[1];
            var notiHours = res.data[res.data.length - 1].time.split('T')[1].split(':')[0];
            var idx = Number(res.data[res.data.length - 1].time.split('-')[1] - res.data[0].time.split('-')[1]);
            if (idx > 2) {
                idx = 2;
            };
            var meanHour = 0;
            var meanDate = 0;
            var meanMonth = 0;
            var countHour = 0;
            var countDate = 0;
            var countMonth = 0;
            for (var i = res.data.length - 1; i >= 0; i--) {
                if (idx === -1) {
                    break;
                };
                if (notiMonth !== res.data[i].time.split('-')[1] || i === 0) {
                    if (i === 0) {
                        if (notiDate !== res.data[i].time.split('T')[0]) {
                            meanMonth += Number(res.data[i].value);
                        } else {
                            if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                                meanDate += Number(res.data[i].value);
                                countDate++;
                            } else {
                                meanHour += Number(res.data[i].value);
                                countHour++;
                            };
                            meanDate += meanHour / countHour;
                            countDate++;
                        };
                    };

                    meanMonth += meanDate / countDate;
                    countMonth++;
                    pdata[idx] = {};
                    pdata[idx].value = meanMonth / countMonth;
                    pdata[idx].time = "Tháng " + notiMonth;
                    notiMonth = res.data[i].time.split('-')[1];
                    notiDate = res.data[i].time.split('T')[0];
                    notiHours = res.data[i].time.split('T')[1].split(':')[0];
                    countDate = 0;
                    countHour = 0;
                    meanDate = 0;
                    meanHour = 0;
                    idx--;
                    if (i !== 0) {
                        i++;
                    }

                } else {
                    if (notiDate !== res.data[i].time.split('T')[0]) {
                        meanDate += meanHour / countHour;
                        countDate++;
                        meanMonth += meanDate / countDate;
                        countMonth++;
                        notiDate = res.data[i].time.split('T')[0];
                        notiHours = res.data[i].time.split('T')[1].split(':')[0];
                        countDate = 0;
                        meanDate = 0;
                        meanHour = Number(res.data[i].value);
                        countHour = 1;
                    } else {
                        if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                            meanDate += meanHour / countHour;
                            notiHours = res.data[i].time.split('T')[1].split(':')[0];
                            meanHour = Number(res.data[i].value);
                            countHour = 1;
                            countDate++;
                        } else {
                            meanHour += Number(res.data[i].value);
                            countHour++;
                        }
                    }
                };
            }
        })
        .catch(function (err) {
            console.log(err);
        });

    refreshHistogram();
}

function setdataClimate() {
    if ($('.time-opt').find('.time-opt-active').hasClass('time-opt-day')) {
        return setdataDay();
    } else if ($('.time-opt').find('.time-opt-active').hasClass('time-opt-week')) {
        return setdataWeek();
    } else if ($('.time-opt').find('.time-opt-active').hasClass('time-opt-month')) {
        return setdataMonth();
    } else if ($('.time-opt').find('.time-opt-active').hasClass('time-opt-3Months')) {
        return setdata3Months();
    }
}

$(document).ready(function () {
    window.setTimeout(function () {
        refreshHistogram();
    }, 100);

})

const setInitialReport = async () => {
    // Initial report
    await axios.get(`${hisurl}`)
        .then(function (res) {
            var table = `<table>
        <tr>
            <th id='report-id'>
                ID
            </th>
            <th id='report-editor'>
                Editor
            </th>
            <th id='report-activity'>
                Activity
            </th>
            <th id='report-date'>
                Date
            </th>
            <th id='report-action'>
                Action
            </th>
        </tr>`;

            for (var i = res.data.length - 1; i >= 0; i--) {
                table += `
                <tr id='report-activity-${i}'>
                    <td>
                        <input type="text" value="${i}" disabled>
                            
                        </input>
                    </td>
                    <td>
                        <input type="text" value="${res.data[i].editor}" disabled>
                            
                        </input>
                    </td>
                    <td>
                        <input type="text" value="${res.data[i].activity}" disabled>
                            
                        </input>
                    </td>
                    <td>
                        <input type="text" value="${res.data[i].time.split('T')[0]} ${res.data[i].time.split('T')[1].split('.')[0]}" disabled>
                            
                        </input>
                    </td>
                    <td>
                        <i class="uil uil-pen" id='report-activity-fix-${i}'></i>
                        <i class="uil uil-check" id='report-activity-check-${i}'></i>
                    </td>
                </tr>
            `;
            };

            table += `</table>`;
            $('.report-wrap').html(table);

            for (i = res.data.length - 1; i >= 0; i--) {
                $(`#report-activity-fix-${i}`).on('click', function (e) {
                    $(this).css('display', 'none');
                    $(`#report-activity-check-${e.target.id.split('-')[3]}`).css({ 'display': 'inline-block' });
                    $(`#report-activity-${e.target.id.split('-')[3]}`).find('input').prop('disabled', false);
                    $(`#report-activity-${e.target.id.split('-')[3]}`).find('input').css('border', '1px solid #7d7d7d')
                })
                $(`#report-activity-check-${i}`).on('click', function (e) {
                    $(this).css('display', 'none');
                    $(`#report-activity-fix-${e.target.id.split('-')[3]}`).css({ 'display': 'inline-block' });
                    $(`#report-activity-${e.target.id.split('-')[3]}`).find('input').prop('disabled', true);
                    $(`#report-activity-${e.target.id.split('-')[3]}`).find('input').css('border', 'none')
                })
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

const setInitialNoti = async () => {
    await axios.get(`${notiurl}`)
        .then(function (res) {
            for (var i = res.data.length - 1; i >= 0; i--) {
                // Set initial variables
                var srcImg = '~/assets/images/Becareful.png';
                var notiDay = res.data[i].time.split('-')[2].split('T')[0];
                var notiMonth = res.data[i].time.split('-')[1];
                var setMonth = '';
                var notiYear = res.data[i].time.split('-')[0];
                var notiTimeHour = res.data[i].time.split('T')[1].split(':')[0];
                var setZone = 'AM';
                var notiTimeMinute = res.data[i].time.split('T')[1].split(':')[1];

                // Set default values
                if (Number(notiTimeHour) > 12) {
                    notiTimeHour = String(Number(notiTimeHour) - 12);
                    setZone = 'PM';
                };
                switch (notiMonth) {
                    case '01':
                        setMonth = 'January';
                        break;
                    case '02':
                        setMonth = 'February';
                        break;
                    case '03':
                        setMonth = 'March';
                        break;
                    case '04':
                        setMonth = 'April';
                        break;
                    case '05':
                        setMonth = 'May';
                        break;
                    case '06':
                        setMonth = 'June';
                        break;
                    case '07':
                        setMonth = 'July';
                        break;
                    case '08':
                        setMonth = 'August';
                        break;
                    case '09':
                        setMonth = 'September';
                        break;
                    case '10':
                        setMonth = 'October';
                        break;
                    case '11':
                        setMonth = 'November';
                        break;
                    case '12':
                        setMonth = 'December';
                        break;
                    default:
                        break;
                }

                // Set source images
                if (res.data[i].status === 'danger') {
                    srcImg = 'https://media.istockphoto.com/id/1152189152/vector/red-alert-icon.jpg?s=612x612&w=0&k=20&c=Kw_-i314F4cxgn2hmakp-88-O45FSx62c6r-OzKYMw4=';
                } else if (res.data[i].status === 'warn') {
                    srcImg = 'https://www.labelsonline.co.uk/media/catalog/product/cache/4144d5a2ad04a864da81790e4da4c21c/5/0/50mm_general_warning-01_2.png';
                } else if (res.data[i].status === 'info') {
                    srcImg = 'https://static.vecteezy.com/system/resources/previews/005/747/906/original/info-icon-template-information-icon-colorful-free-vector.jpg';
                };
                $('.notification-wrap').append(`
                <div id='notification-wrap__${i}'>
                    <img src="${srcImg}" alt="" class='notification-avt''/>
                    <div class='notification-main'>
                        <div class='notification-info'>
                            <p class='notification-name'>
                                #330${i} ${res.data[i].problem}
                            </p>
                            <p class='notification-time'>
                                ${notiDay} ${setMonth} ${notiYear}, ${notiTimeHour}:${notiTimeMinute} ${setZone}
                            </p>
                        </div>
                        <div>
                            <div class='notification-activity' id='noti-activity-${i}'>
                                Turn ${res.data[i].sub_problem.split(' ')[2]}
                            </div>
                        </div>
                    </div>
                </div>
        `);
                if (res.data[i].sub_problem.split(' ')[2] === 'off') {
                    $('#noti-activity-' + i).css('background-color', '#ca2128');
                }

                $('#noti-activity-' + i).on('click', function (e) {
                    $('.notification-wrap').find('#notification-wrap__' + e.target.id.split('-')[2]).remove();
                    axios.delete(`http://localhost:3000/notification/${garden_id}/delete/${res.data[e.target.id.split('-')[2]].id}`);
                    var notiId = res.data[e.target.id.split('-')[2]].id;
                    var notiActivity = res.data[e.target.id.split('-')[2]].sub_problem.split(' ')[2] === 'on' ? 'Turn on the ' : 'Turn off the ';
                    notiActivity += res.data[e.target.id.split('-')[2]].sub_problem.split(' ')[4];
                    var today = new Date();
                    var date = today.getFullYear()
                        + '-' + (Number(today.getMonth() + 1) >= 10 ? today.getMonth() + 1 : '0' + (today.getMonth() + 1))
                        + '-' + (Number(today.getDate()) >= 10 ? today.getDate() : '0' + today.getDate());
                    var time = (Number(today.getHours()) >= 10 ? today.getHours() : '0' + today.getHours())
                        + ":" + (Number(today.getMinutes()) >= 10 ? today.getMinutes() : '0' + today.getMinutes())
                        + ":" + (Number(today.getSeconds()) >= 10 ? today.getSeconds() : '0' + today.getSeconds());
                    axios.post(`http://localhost:3000/history/${garden_id}/add/${notiId}k/${'Huynh Tuan Kiet'}/${notiActivity}/${date} ${time}`)
                        .then(function (res) {
                            setInitialReport();
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                })
            };

        })
        .catch(function (err) {
            console.log(err);
        })
        ;
}

function Statistical() {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // Check loading
        if (!isLoading) {
            // Initial report
            setInitialReport();

            // Initial notification 
            setInitialNoti();

        } else {
            // Get data from Database and First render
            axios.get(`${url}`)
                .then(function (res) {
                    refreshData();

                    var notiDate = res.data[res.data.length - 1].time.split('T')[0];
                    var notiHours = res.data[res.data.length - 1].time.split('T')[1].split(':')[0];
                    var idx = 0;
                    var count = 0;
                    var mean = 0;
                    for (var i = res.data.length - 1; i >= 0; i--) {
                        if (idx === 23) {
                            break;
                        };
                        if (i === 0 && res.data[i].time.split('T')[0] === notiDate) {
                            if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                                idx++;
                            };
                            break;
                        } else if (res.data[i].time.split('T')[0] !== notiDate || i === 0) {
                            break;
                        };
                        if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                            idx++;
                            notiHours = res.data[i].time.split('T')[1].split(':')[0];
                            i++;
                        }
                    };
                    notiHours = res.data[res.data.length - 1].time.split('T')[1].split(':')[0];
                    for (var i = res.data.length - 1; i >= 0; i--) {
                        if (res.data[i].time.split('T')[0] !== notiDate || i === 0) {
                            if (i === 0) {
                                if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                                    pdata[idx] = {};
                                    pdata[idx].value = mean / count;
                                    pdata[idx].time = notiHours + ":00:00";
                                    pdata[idx - 1] = {};
                                    pdata[idx - 1].value = Number(res.data[i].value);
                                    pdata[idx - 1].time = res.data[i].time.split('T')[1].split(':')[0] + ":00:00";
                                } else {
                                    mean += Number(res.data[i].value);
                                    count++;
                                    pdata[idx] = {};
                                    pdata[idx].value = mean / count;
                                    pdata[idx].time = notiHours;
                                };
                                break;
                            };
                            pdata[idx] = {};
                            pdata[idx].value = mean / count;
                            pdata[idx--].time = notiHours + ":00:00";
                            break;
                        };
                        if (notiHours !== res.data[i].time.split('T')[1].split(':')[0]) {
                            pdata[idx] = {};
                            pdata[idx].value = mean / count;
                            pdata[idx--].time = notiHours + ":00:00";
                            notiHours = res.data[i].time.split('T')[1].split(':')[0];
                            i++;
                            mean = 0;
                            count = 0;
                        } else {
                            mean += Number(res.data[i].value);
                            count++;
                        }
                    };

                    window.setTimeout(function () {
                        $('.freq-temp').animate({ width: `${freqdata[0].value}%` });
                        $('.freq-light').animate({ width: `${freqdata[1].value}%` });
                        $('.freq-humid').animate({ width: `${freqdata[2].value}%` });
                        $('.freq-soil').animate({ width: `${freqdata[3].value}%` });
                        $('.temp-mean').html(`${meanTemp.toFixed(2)} <sup>o</sup>C`)
                        $('.light-mean').html(`${meanLight.toFixed(2)} Lux`);
                        $('.humid-mean').html(`${meanHumid.toFixed(2)}%`);
                        $('.soil-mean').html(`${meanSoil.toFixed(2)}%`);
                    }, 1000);
                })
                .catch(function (err) {
                    console.log(err);
                });

        }

        if (subdataTemp !== [] && subdataLight !== [] && subdataSoil !== [] && subdataHumid !== [] && pdata !== [] && maindata !== []) {
            setTimeout(function () {
                setLoading(false);
            }, 50)
        };
        // Scrool default
        $("html, body").animate({ scrollTop: 0 }, "fast");

        // Jquery

        // Time - options
        $('.time-opt-day').on('click', function (e) {
            $('.time-opt').find('.time-opt-active').removeClass('time-opt-active');
            $(this).addClass('time-opt-active');
            setdataDay();
        })

        $('.time-opt-week').on('click', function (e) {
            $('.time-opt').find('.time-opt-active').removeClass('time-opt-active');
            $(this).addClass('time-opt-active');
            setdataWeek();
        })

        $('.time-opt-month').on('click', function (e) {
            $('.time-opt').find('.time-opt-active').removeClass('time-opt-active');
            $(this).addClass('time-opt-active');
            setdataMonth();
        })

        $('.time-opt-3Months').on('click', function (e) {
            $('.time-opt').find('.time-opt-active').removeClass('time-opt-active');
            $(this).addClass('time-opt-active');
            setdata3Months();
        })


        // Climate - options
        $('.climate-opt').on('change', function (e) {
            $('.TempChart').css('display', 'none');
            $('.LightChart').css('display', 'none');
            $('.HumidChart').css('display', 'none');
            $('.SoilChart').css('display', 'none');
            if ($('.climate-opt option:selected').text() === 'Temperature') {
                $('.TempChart').css('display', 'flex');
                url = `http://localhost:3000/climates/${garden_id}/temp`;
            } else if ($('.climate-opt option:selected').text() === 'Light') {
                $('.LightChart').css('display', 'flex');
                url = `http://localhost:3000/climates/${garden_id}/light`;
                console.log(url);
            } else if ($('.climate-opt option:selected').text() === 'Humidity') {
                $('.HumidChart').css('display', 'flex');
                url = `http://localhost:3000/climates/${garden_id}/humi`;
            } else if ($('.climate-opt option:selected').text() === 'Soil Moisture') {
                $('.SoilChart').css('display', 'flex');
                url = `http://localhost:3000/climates/${garden_id}/soil`;
            };

            setdataClimate();
            refreshHistogram();
        })
    });

    if (isLoading) {
        return;
    }

    // Render
    return (
        <div className={cx('statis-body')}>
            <p className={cx('statis-title')}>
                Chart Widgets
            </p>
            <div className={cx('statis-general')}>
                <div className={cx('statis-main')}>
                    <div className={cx('statis-main__top')}>
                        <p className={cx('statis-main__title')}>
                            Statistics
                        </p>
                        <i className="uil uil-ellipsis-h"></i>
                    </div>
                    <div className={cx('statis-main__content')}>
                        <div className={cx('statis-main__histogram')}>
                            <MainChart />
                        </div>
                        <div className={cx('histogram-legend')}>
                            <div className={cx('legend__temp')}>
                                <div>
                                    <div>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        Temperature
                                    </p>
                                    <p className={cx('temp-max')}>
                                        40 <sup>o</sup>C
                                    </p>
                                </div>
                            </div>
                            <div className={cx('legend__light')}>
                                <div>
                                    <div>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        Light
                                    </p>
                                    <p className={cx('light-max')}>
                                        4096 Lux
                                    </p>
                                </div>
                            </div>
                            <div className={cx('legend__humid')}>
                                <div>
                                    <div>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        Humidity
                                    </p>
                                    <p className={cx('humid-max')}>
                                        100%
                                    </p>
                                </div>
                            </div>
                            <div className={cx('legend__soil')}>
                                <div>
                                    <div>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        Soil Moisture
                                    </p>
                                    <p className={cx('soil-max')}>
                                        100%
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('statis-frequency')}>
                    <div className={cx('statis-frequency__top')}>
                        <p className={cx('statis-frequency__title')}>
                            Frequency
                        </p>
                        <i className="uil uil-ellipsis-h"></i>
                    </div>
                    <div className={cx('statis-frequency__content')}>
                        <div className={cx('statis-frequency__histogram')}>
                            <FreqChart />
                        </div>
                        <div className={cx('histogram-legend')}>
                            <div className='legend__temp'>
                                <p>Temperature</p>
                                <div>
                                    <div className={('freq-temp')} >

                                    </div>
                                </div>
                            </div>
                            <div className='legend__light'>
                                <p>Light</p>
                                <div>
                                    <div className={('freq-light')}>

                                    </div>
                                </div>
                            </div>
                            <div className='legend__humid'>
                                <p>Humidity</p>
                                <div>
                                    <div className={('freq-humid')}>

                                    </div>
                                </div>
                            </div>
                            <div className='legend__soil'>
                                <p>Soil Moisture</p>
                                <div>
                                    <div className={('freq-soil')}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('statis-particular')}>
                <div className={cx('statis-content')}>
                    <p className={cx('statis-content__title')}>
                        Statistics
                    </p>
                    <select className={cx('climate-opt')}>
                        <option value="" className={cx('climate-opt-temp')}>Temperature</option>
                        <option value="" className={cx('climate-opt-light')}>Light</option>
                        <option value="" className={cx('climate-opt-humid')}>Humidity</option>
                        <option value="" className={cx('climate-opt-soil')}>Soil Moisture</option>
                    </select>
                    <div className={cx('time-opt')}>
                        <div className={cx('time-opt-day time-opt-active')}>
                            Day
                        </div>
                        <div className={cx('time-opt-week')}>
                            7-Days
                        </div>
                        <div className={cx('time-opt-month')}>
                            30-Days
                        </div>
                        <div className={cx('time-opt-3Months')}>
                            3-Months
                        </div>
                    </div>
                </div>
                <div className={cx('statis-histogram')}>
                    <TempChart />
                    <LightChart />
                    <HumidChart />
                    <SoilChart />
                </div>
            </div>

            <div className={cx('statis-more')}>
                <div className={cx('statis-more__histogram')}>
                    <div className={cx('statis-more-top')}>
                        <i className="uil uil-sun"></i>
                        <div>
                            <p>
                                Temperature
                            </p>
                            <p className={cx('temp-mean')}>
                            </p>
                        </div>
                    </div>
                    <div className={cx('statis-more-bottom')}>
                        <SubTempChart />
                    </div>
                </div>
                <div className={cx('statis-more__histogram')}>
                    <div className={cx('statis-more-top')}>
                        <i className="uil uil-brightness-half"></i>
                        <div>
                            <p>
                                Light
                            </p>
                            <p className={cx('light-mean')}>
                            </p>
                        </div>
                    </div>
                    <div className={cx('statis-more-bottom')}>
                        <SubLightChart />
                    </div>
                </div>
                <div className={cx('statis-more__histogram')}>
                    <div className={cx('statis-more-top')}>
                        <i className="uil uil-tear"></i>
                        <div>
                            <p>
                                Humidity
                            </p>
                            <p className={cx('humid-mean')}>
                            </p>
                        </div>
                    </div>
                    <div className={cx('statis-more-bottom')}>
                        <SubHumidChart />
                    </div>
                </div>
                <div className={cx('statis-more__histogram')}>
                    <div className={cx('statis-more-top')}>
                        <i className="uil uil-mountains-sun"></i>
                        <div>
                            <p>
                                Soil Moisture
                            </p>
                            <p className={cx('soil-mean')}>
                            </p>
                        </div>
                    </div>
                    <div className={cx('statis-more-bottom')}>
                        <SubSoilChart />
                    </div>
                </div>
            </div>

            <div className={cx('statis-history')}>
                <div className={cx('statis-notification')}>
                    <div>
                        <p>
                            Notification
                        </p>
                    </div>
                    <div className={cx('notification-wrap')}>
                    </div>
                </div>
                <div className={cx('statis-report')}>
                    <div>
                        <p>
                            Report
                        </p>
                    </div>
                    <div className={cx('report-wrap')}>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Statistical;