import './header.scss';
import { useState, useEffect } from 'react';
import $, { get } from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAngleDown,
    faAngleRight,
    faBell,
    faChalkboard,
    faChartSimple,
    faGear,
    faHome,
    faPowerOff,
    faRightFromBracket,
    faTriangleExclamation,
    faUser,
    faHouseChimneyMedical,
    faHouseCircleCheck,
    faArrowRightArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import { getUserByID, logout } from '~/api/api';
import cookie from 'cookie';
import { getCookie, setCookie } from '~/api/cookie';
import axios from 'axios';

function Header() {
    const [currentUser, setCurrentUser] = useState();
    const handleLogout = () => {
        logout();
        window.location.href = './';
    };

    const checkGarden = () => {
        if (getCookie('garden_id') === '') {
            return true;
        };
        return false;
    }

    // const checkUrlGarden = async () => {
    //     await axios.get(`http://localhost:3000/garden/${getCookie('garden_id')}`).then(function (res) {
    //         if (res.data.url === 'EMPTY DATA') return 0;
    //         return 1;
    //     }).catch(function (err) {
    //         console.log(err);
    //     })
    // }

    const createGarden = async () => {
        const gardenData = {
            url: 'EMPTY DATA',
            gKey: 'EMPTY DATA'
        };
        await axios.post('http://localhost:3000/garden', gardenData).then(function (res) {
            setCookie('garden_id', res.data.id, 30);
            // console.log(getCookie('garden_id'));
        }).catch(function (err) {
            console.log(err);
        });

        await axios.post(`http://localhost:3000/auth/${getCookie('user_id')}/${getCookie('garden_id')}`).then(function (res) {
            // console.log(res);
        }).catch(function (err) {
            console.log(err);
        })

        window.location.reload();
    }

    const existGarden = () => {
        $('body').css('overflow', 'hidden');
        $('body .type-table').css('display', 'block');
        $('body .type-wrapper__title').html('Nhập mã định danh của Garden');

        $('body .type-wrapper button').on('click', async (e) => {
            setCookie('garden_id', $('body .type-wrapper input').val(), 30);
            await axios.post(`http://localhost:3000/auth/${getCookie('user_id')}/${getCookie('garden_id')}`).then(function (res) {
                // console.log(res);
            }).catch(function (err) {
                console.log(err);
            })

            window.location.reload();
        })
    }

    const changeUrl = () => {
        $('body').css('overflow', 'hidden');
        $('body .type-table').css('display', 'block');
        $('body .type-wrapper__title').html('Nhập giá trị URL của Dashboard');

        $('body .type-wrapper button').on('click', async (e) => {
            const gKey = await axios.get(`http://localhost:3000/garden/${getCookie('garden_id')}`).then(function (res) {
                return res.data.gKey;
                // console.log(res.data.gKey);
            }).catch(function (err) {
                console.log(err);
            });

            const gardenData = {
                url: $('body .type-wrapper input').val(),
                gKey: gKey
            }

            await axios.patch(`http://localhost:3000/garden/${getCookie('garden_id')}`, gardenData).then(function (res) {
                // console.log(res);
                // console.log($('body .type-wrapper input').val());
                // console.log(getCookie('garden_id'));
            }).catch(function (err) {
                console.log(err);
            })

            window.location.reload();
        });
    }

    const changeKey = () => {
        $('body').css('overflow', 'hidden');
        $('body .type-table').css('display', 'block');
        $('body .type-wrapper__title').html('Nhập giá trị KEY của Dashboard');

        $('body .type-wrapper button').on('click', async (e) => {
            const url = await axios.get(`http://localhost:3000/garden/${getCookie('garden_id')}`).then(function (res) {
                return res.data.url;
                // console.log(res.data.gKey);
            }).catch(function (err) {
                console.log(err);
            });

            const gardenData = {
                url: url,
                gKey: $('body .type-wrapper input').val()
            }

            await axios.patch(`http://localhost:3000/garden/${getCookie('garden_id')}`, gardenData).then(function (res) {
                // console.log(res);
                // console.log($('body .type-wrapper input').val());
                // console.log(getCookie('garden_id'));
            }).catch(function (err) {
                console.log(err);
            });
            window.location.reload();
        });
    }

    useEffect(() => {
        (async () => {
            await getUserByID(getCookie('user_id')).then((data) => {
                setCurrentUser(data);
            });
        })();


    }, []);

    return (
        <header className="header-section">
            <div className="top-header">
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="top-header__brand">GSTomato</div>
                        <div className="top-header__toggle-menu"></div>
                        <div className="d-flex justify-content-end align-items-center top-header__collapse">
                            <div class="top-header__item-left dropdown">
                                <a
                                    class="top-header__link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    <FontAwesomeIcon icon={faBell} />
                                </a>

                                <ul class="dropdown-menu dropdown-noti">
                                    <li>
                                        <div class="dropdown-item dropdown__header" href="#">
                                            3 New Notifications
                                        </div>
                                    </li>
                                    <li>
                                        <a class="d-flex align-items-center dropdown-item" href="#">
                                            <div className="col-2">
                                                <div className="dropdown-icon dropdown-icon-secondary">
                                                    <FontAwesomeIcon icon={faHome} />
                                                </div>
                                            </div>
                                            <div className="col-10">
                                                <div className="noti-title">Login from 192.168.1.1</div>
                                                <div className="noti-sub-title">
                                                    Aliquam ex eros, imperdiet vulputate hendrerit et.
                                                </div>
                                                <div className="noti-sub-title">12h ago</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="d-flex align-items-center dropdown-item" href="#">
                                            <div className="col-2">
                                                <div className="dropdown-icon dropdown-icon-warning">
                                                    <FontAwesomeIcon icon={faTriangleExclamation} />
                                                </div>
                                            </div>
                                            <div className="col-10">
                                                <div className="noti-title">99% server load</div>
                                                <div className="noti-sub-title">
                                                    Etiam nec fringilla magna. Donec mi metus.
                                                </div>
                                                <div className="noti-sub-title">20h ago</div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            class="d-flex align-items-center dropdown-item dropdown-icon-danger"
                                            href="#"
                                        >
                                            <div className="col-2">
                                                <div className="dropdown-icon">
                                                    <FontAwesomeIcon icon={faPowerOff} />
                                                </div>
                                            </div>
                                            <div className="col-10">
                                                <div className="noti-title">Server restarted</div>
                                                <div className="noti-sub-title">19h ago</div>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            {currentUser && (
                                <div className="d-flex align-items-center top-header__item-right">
                                    <div class="dropdown">
                                        <div
                                            class="d-flex align-items-center dropdown-toggle"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <div className="top-header__username">{currentUser.name}</div>
                                            <div className="top-header__avatar">
                                                <img src={currentUser.avatar}></img>
                                            </div>
                                        </div>

                                        <ul class="dropdown-menu">
                                            <li>
                                                <a class="d-flex align-items-center dropdown-item" href="#">
                                                    <div className="top-header__icon col-2">
                                                        <FontAwesomeIcon icon={faUser} />
                                                    </div>
                                                    <div className="col-10">My Profile</div>
                                                </a>
                                            </li>
                                            <li>
                                                <a class="d-flex align-items-center dropdown-item" href="#">
                                                    <div className="top-header__icon col-2">
                                                        <FontAwesomeIcon icon={faGear} />
                                                    </div>
                                                    <div className="col-10">Account settings</div>
                                                </a>
                                            </li>
                                            {
                                                checkGarden() && (
                                                    <li className='create-garden' onClick={createGarden}>
                                                        <div class="d-flex align-items-center dropdown-item">
                                                            <div className="top-header__icon col-2">
                                                                <FontAwesomeIcon icon={faHouseChimneyMedical} />
                                                            </div>
                                                            <div className="col-10">Create new garden</div>
                                                        </div>
                                                    </li>
                                                )
                                            }
                                            <li className='exist-garden' onClick={existGarden}>
                                                <div class="d-flex align-items-center dropdown-item">
                                                    <div className="top-header__icon col-2">
                                                        <FontAwesomeIcon icon={faHouseCircleCheck} />
                                                    </div>
                                                    <div className="col-10">Select garden</div>
                                                </div>
                                            </li>
                                            {
                                                !checkGarden() && (
                                                    <li className='change-garden' onClick={changeUrl}>
                                                        <a class="d-flex align-items-center dropdown-item" href="#">
                                                            <div className="top-header__icon col-2">
                                                                <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                                                            </div>
                                                            <div className="col-10">Change URL</div>
                                                        </a>
                                                    </li>
                                                )
                                            }
                                            {
                                                !checkGarden() && (
                                                    <li className='change-key' onClick={changeKey}>
                                                        <a class="d-flex align-items-center dropdown-item" href="#">
                                                            <div className="top-header__icon col-2">
                                                                <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                                                            </div>
                                                            <div className="col-10">Change KEY</div>
                                                        </a>
                                                    </li>
                                                )
                                            }
                                            <li>
                                                <hr class="dropdown-divider" />
                                            </li>
                                            <li>
                                                <button
                                                    class="d-flex align-items-center dropdown-item"
                                                    onClick={handleLogout}
                                                >
                                                    <div className="top-header__icon col-2">
                                                        <FontAwesomeIcon icon={faRightFromBracket} />
                                                    </div>
                                                    <div className="col-10">Log out</div>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {!currentUser && (
                                <div className="d-flex align-items-center top-header__item-right">
                                    <div className="top-header__item">
                                        <a href="./login" className="top-header__link">
                                            Login
                                        </a>
                                    </div>
                                    <div className="top-header__item">
                                        <a href="./signup" className="top-header__link">
                                            SignUp
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-header">
                <div className="container">
                    <div className="d-flex justify-content-center align-items-center">
                        <a href="./" className="d-flex bottom-header__item">
                            <div className="bottom-header__icon">
                                <FontAwesomeIcon icon={faHome} />
                            </div>
                            <div className="bottom-header__link">Home</div>
                        </a>
                        <a href="./climate" className="d-flex bottom-header__item">
                            <div className="bottom-header__icon">
                                <FontAwesomeIcon icon={faChalkboard} />
                            </div>
                            <div className="bottom-header__link">Dashboard</div>
                        </a>
                        <a href="./statis" className="d-flex bottom-header__item">
                            <div className="bottom-header__icon">
                                <FontAwesomeIcon icon={faChartSimple} />
                            </div>
                            <div className="bottom-header__link">Statistical</div>
                        </a>
                        <a href="setting" className="d-flex bottom-header__item">
                            <div className="bottom-header__icon">
                                <FontAwesomeIcon icon={faGear} />
                            </div>
                            <a href="/setting" className="bottom-header__link">
                                Settings
                            </a>
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
