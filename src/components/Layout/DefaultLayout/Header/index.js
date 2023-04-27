import './header.scss';
import { useState, useEffect } from 'react';
import $ from 'jquery';

function Header() {
    useEffect(() => {
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        // $(window).on('scroll', function () {
        var navbar = $('.navbar');
        navbar.addClass('fixed');
        // })
    });

    return (
        <header className="header-section">
            <nav id="navbar_top" className="navbar navbar-expand-lg bg-body-tertiary inner__header">
                <div className="container-fluid pc__header">
                    <a className="navbar-brand header__logo" href="/">
                        GSTomato
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse header__menu" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item header__item">
                                <a href="/" className="nav-link header__link">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item dropdown header__item">
                                <a
                                    className="nav-link dropdown-toggle header__link"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Features
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <a className="dropdown-item" href="/climate">
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/statis">
                                            Statistical
                                        </a>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider"></hr>
                                    </li>
                                    <li>
                                        <a className="dropdown-item" href="/setting">
                                            Setting
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item header__item">
                                <a href="" className="nav-link header__link">
                                    About us
                                </a>
                            </li>
                            <li className="nav-item header__item">
                                <a href="" className="nav-link header__link">
                                    Services
                                </a>
                            </li>
                            <li className="nav-item header__item">
                                <a href="" className="nav-link header__link">
                                    Contact
                                </a>
                            </li>
                            <li className="nav-item header__item">
                                <a href="" className="nav-link header__link">
                                    Connect
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;
