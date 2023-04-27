import './footer.scss';

function Footer() {
    return (
        <div className="footer">
            <div className="top__footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 pb-2">
                            <div className="footer__brand">GSTomato</div>
                            <div className="footer__text">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                            </div>
                            <div className="footer__contact d-flex">
                                <a href="#" className="footer__icon">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="#" className="footer__icon">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                                <a href="#" className="footer__icon">
                                    <i className="fa-brands fa-twitter"></i>
                                </a>
                                <a href="#" className="footer__icon">
                                    <i className="fa-brands fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="footer__title pb-2">CUSTOMER SERVICES</div>
                            <div className="footer__items">
                                <div className="footer__item">Help Center</div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <div className="footer__title pb-2">ABOUT US</div>
                            <div className="footer__items">
                                <div className="footer__item">PolkaDots Overview</div>
                                <div className="footer__item">Privacy Policy</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bottom__footer">
                <div className="container">
                    <div className="d-flex justify-content-center align-item-center">
                        <div className="bf__item">PRIVACY POLICY</div>
                        <div className="bf__item">OPERATION REGULATIONS</div>
                        <div className="bf__item">SHIPPING POLICY</div>
                        <div className="bf__item">SHIPPING AND REFUND POLICY</div>
                    </div>
                    <div className="text-center">
                        <div className="bf__title_icon">
                            <i className="uil uil-channel"></i>
                        </div>
                        <div className="bf__title">Company Limited PolkaDots</div>
                        <div className="bf__item">
                            Address: Kí túc xá Khu A - Đại Học Quốc Gia TP.HCM, Khu phố 6, phường Linh Trung, thành phố
                            Thủ Đức.
                        </div>
                        <div className="bf__item">
                            Contact center: 19002412 - Email: admin@polkadots.com - Phone: 0923 123 123
                        </div>
                        <div className="bf__item">
                            <i className="fa-solid fa-copyright"></i> 2022 - Copyright belongs to PolkaDots
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
