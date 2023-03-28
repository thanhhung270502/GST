import './home.scss';
import { useState, useEffect } from 'react';
import $ from 'jquery'; // npm install jquery

function Home() {
    useEffect(() => {
        $('html, body').animate({ scrollTop: 0 }, 'fast');

        var show = document.getElementsByClassName('header-section')[0];
        var navbar = $('.navbar');
        navbar.removeClass('fixed');
        $(window).on('scroll', function () {
            var scroll = $(window).scrollTop();

            if (scroll < 50) {
                navbar.removeClass('sticky');
            } else if (scroll >= 50) {
                navbar.addClass('sticky');
            }
        });
    });

    return (
        <div className="home-body">
            <img src={require('~/assets/images/banner.jpg')} alt="tomato" id="homepic" />
            <div className="home-content">
                <div className="ct ct-1">
                    <div className="first pb-5">
                        Planting a tree is not as easy as it seems. If we don't know any knowledge about the type of
                        tree we are growing, it will never grow as we expect. For that reason, this website was created
                        to help you acquire and practice more knowledge about growing plants, specifically tomatoes.
                        Please contact us if you need more help!
                    </div>
                    <div className="text-center pt-3 second">
                        Domitory A, Ho Chi Minh city | 123-456-7890 | info@mysite.com
                    </div>
                </div>
                <div className="d-flex align-items-center ct ct-2">
                    <div className="col-8">
                        <img src={require('~/assets/images/tomato.jpg')} className="img-fluid"></img>
                    </div>
                    <div className="col-4">
                        <div className="title">About Us</div>
                        <div className="content">
                            This is a website with most of content about tomatoes and how to grow them. Hope it helps
                            you!
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center ct ct-3">
                    <div className="col-5">
                        <div className="title">Temperature</div>
                        <div className="content">
                            Temperatures below 12°C or above 30°C will adversely affect plant growth and affect pollen
                            viability, causing flower drop and fruit failure.
                        </div>
                    </div>
                    <div className="col-7">
                        <img src={require('~/assets/images/temptomato.jpg')} className="img-fluid"></img>
                    </div>
                </div>
                <div className="d-flex align-items-center ct ct-4">
                    <div className="col-8">
                        <img src={require('~/assets/images/lighttomato.jpg')} className="img-fluid"></img>
                    </div>
                    <div className="col-4">
                        <div className="title">Lighting</div>
                        <div className="content">
                            Tomato plants need to be grown in full sunlight and need to be exposed to light for 6-8
                            hours a day.
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center ct ct-5">
                    <div className="col-5">
                        <div className="title">Soil and Nutrients</div>
                        <div className="content">
                            The soil needs to contain a lot of organic nutrients. Soil pH from 5.5 to 7.0 is standard.
                        </div>
                    </div>
                    <div className="col-7">
                        <img src={require('~/assets/images/temptomato.jpg')} className="img-fluid"></img>
                    </div>
                </div>
                <div className="ct ct-6">
                    <div className="text-center image">
                        <img src={require('~/assets/images/tomato2.jpg')} className=""></img>
                    </div>
                    <div className="">
                        <div className="content">
                            The most suitable time to plant tomato plants with quality and yield is in the winter -
                            spring crop in October - November and harvested in January - February.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
