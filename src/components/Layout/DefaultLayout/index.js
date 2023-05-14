import Header from './Header';
import Footer from './Footer';
import $ from 'jquery';

const submitVal = () => {
    $('body .type-table').css('display', 'none');
    $('body').css('overflow', 'auto');
}

$(document).ready(function () {
    $('.type-exit-btn').on('click', function (e) {
        $('body .type-table').css('display', 'none');
        $('body').css('overflow', 'auto');
    })
})

function DefaultLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="content">{children}</div>
            <Footer />
            <div className='type-table'>
                <div className='type-wrapper'>
                    <div className='type-exit-btn'>
                        <i class="uil uil-times"></i>
                    </div>
                    <p className='type-wrapper__title'>
                        Nhập giá trị
                    </p>
                    <div>
                        <input type="text" />
                        <button onClick={submitVal}>GET</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
