import './home.scss';

function Home() {
    window.onscroll = () => {
        var navbar = document.getElementsByClassName("header-section")[0];
        navbar.style.display = "block";
    }
    return (
        <div className='home-body'>
            <img src={require('~/assets/images/banner.jpg')} alt="tomato" id='homepic' />
            <div className='middle-content'>
                <div className='first-mc'>
                    Planting a tree is not as easy as it seems. If we don't know any knowledge about the type of tree we are growing,
                    it will never grow as we expect. For that reason, this website was created to help you acquire and
                    practice more knowledge about growing plants, specifically tomatoes.
                    Please contact us if you need more help!
                    <p>
                        Domitory A, Ho Chi Minh city |   123-456-7890   |   info@mysite.com
                    </p>
                </div>
                <hr />
                <div className='second-mc'>
                    <div className='smc'>
                        <div className='smc-left'>
                            <img src={require('~/assets/images/tomato.jpg')} alt="" />
                        </div>
                        <div className='smc-right'>
                            <div className="smcr">
                                <p className='smcr-title'>
                                    About us
                                </p>
                                <div className='smcr-content'>
                                    <p>
                                        This is a website with most of content about tomatoes and how to grow them.
                                        Hope it helps you!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='smc'>
                        <div className='smc-right'>
                            <div className="smcr">
                                <p className='smcr-title'>
                                    Temperature
                                </p>
                                <div className='smcr-content'>
                                    <p>
                                        Temperatures below 12°C or above 30°C will adversely affect plant
                                        growth and affect pollen viability, causing flower drop and fruit failure.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='smc-left'>
                            <img src={require('~/assets/images/temptomato.jpg')} alt="" />
                        </div>
                    </div>

                    <div className='smc'>
                        <div className='smc-left'>
                            <img src={require('~/assets/images/lighttomato.jpg')} alt="" />
                        </div>
                        <div className='smc-right'>
                            <div className="smcr">
                                <p className='smcr-title'>
                                    Light
                                </p>
                                <div className='smcr-content'>
                                    <p>
                                        Tomato plants need to be grown in full sunlight and
                                        need to be exposed to light for 6-8 hours a day.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='smc'>
                        <div className='smc-right'>
                            <div className="smcr">
                                <p className='smcr-title'>
                                    Soil and Nutrients
                                </p>
                                <div className='smcr-content'>
                                    <p>
                                        The soil needs to contain a lot of organic nutrients.
                                        Soil pH from 5.5 to 7.0 is standard.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='smc-left'>
                            <img src={require('~/assets/images/soiltomato.jpg')} alt="" />
                        </div>
                    </div>

                    <div className='smct'>
                        <div className='smct-drop'>
                            <img src={require('~/assets/images/tomato2.jpg')} alt="" />
                        </div>
                        <div className='smctime'>
                            <p>
                                The most suitable time to plant
                                tomato plants with quality and yield is in the winter - spring crop in October - November and
                                harvested in January - February.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
}

export default Home;