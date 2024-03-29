import './footer.scss';
import Logo from '../../../../assets/images/logo.png';

const dayOfWeekName = new Date().toLocaleString('default', { weekday: 'long' });

function Footer() {
    return (
        <div className="container-fluid bg-white">
            <footer className="my-footer">
                <ul className="nav justify-content-center align-top border-bottom pb-3">
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-muted">
                            Home Page
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-muted">
                            About Us{' '}
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-muted">
                            Pricing
                        </a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-muted">
                            {' '}
                            Contact Us{' '}
                        </a>
                    </li>
                </ul>
                <div className="text-center Logo">
                    <h1 className='mb-0'>Have a good {dayOfWeekName}!</h1>
                    <img src={Logo} className="img-fluid rounded mx-auto d-block" alt="logo" />
                </div>
                <div className="text-center text-muted pb-3">&copy; 2023 GSTomato Company, Inc</div>
            </footer>
        </div>
    );
}

export default Footer;
