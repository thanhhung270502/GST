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
        <header class="header-section">
            <nav id="navbar_top" class="navbar navbar-expand-lg bg-body-tertiary inner__header">
                <div class="container-fluid pc__header">
                    <a class="navbar-brand header__logo" href="/">
                        GSTomato
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse header__menu" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item header__item">
                                <a href="/" class="nav-link header__link">
                                    Home
                                </a>
                            </li>
                            <li class="nav-item dropdown header__item">
                                <a
                                    class="nav-link dropdown-toggle header__link"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Features
                                </a>
                                <ul class="dropdown-menu">
                                    <li>
                                        <a class="dropdown-item" href="/climate">
                                            Conditions
                                        </a>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="/statis">
                                            Statistical
                                        </a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider"></hr>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="/setting">
                                            Setting
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item header__item">
                                <a href="" class="nav-link header__link">
                                    About us
                                </a>
                            </li>
                            <li class="nav-item header__item">
                                <a href="" class="nav-link header__link">
                                    Services
                                </a>
                            </li>
                            <li class="nav-item header__item">
                                <a href="" class="nav-link header__link">
                                    Contact
                                </a>
                            </li>
                            <li class="nav-item header__item">
                                <a href="" class="nav-link header__link">
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
