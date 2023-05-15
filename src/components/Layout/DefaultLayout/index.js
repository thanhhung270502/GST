import Header from './Header';
import Footer from './Footer';
import General from './General';

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <General />
            <div className="content">{children}</div>   
            <Footer />
        </div>
    );
}

export default DefaultLayout;
