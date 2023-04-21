import './footer.scss';
import Logo from '../../../../assets/images/logo.png';
function Footer() {
    return (
        <div className="footer">
            <div className="container-fluid bg-white">
  <footer className="py-3 mt-4">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home Page</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About Us </a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-muted"> Contact Us </a></li>
    </ul>
    <div className="text-center logo">
    <img src={Logo} className = "img-fluid rounded mx-auto d-block" alt="logo" />
    </div>
    <p className="text-center text-muted">&copy; 2023 GSTomato Company, Inc</p>
  </footer>
</div>
</div>
    );
}

export default Footer;
