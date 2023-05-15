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
} from '@fortawesome/free-solid-svg-icons';
import { getUserByID, logout } from '~/api/api';
import { getCookie } from '~/api/cookie';

function Header() {
    const [currentUser, setCurrentUser] = useState();
    const handleLogout = () => {
        logout();
        window.location.href = './';
    };

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
