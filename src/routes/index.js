// Layouts
import { OnlyHeader } from '~/components/Layout';
// import Footer from '~/components/Layout/DefaultLayout/Footer';

// Pages
import Home from '~/pages/Home';
import Setting from '~/pages/Setting';
import StaticPage from '~/pages/Conditions';
import Statis from '~/pages/Statistical';
// import Product_Index from '~/pages/Product_Index';
import Test from '~/pages/Test';
import Upload from '~/pages/Upload';
import Climate from '../pages/View Current Climate';
import Login from '~/pages/Login';
import SignUp from '~/pages/SignUp';

// Không cần đăng nhập vẫn vào được
const publicRoutes = [
    // http://localhost:3000
    {
        path: '/',
        component: Home,
    },
    // http://localhost:3000/conditions
    {
        path: '/conditions',
        component: StaticPage,
    },
    // http://localhost:3000/test
    {
        path: '/test',
        component: Test,
        layout: OnlyHeader,
    },
    // http://localhost:3000/upload
    {
        path: '/upload',
        component: Upload,
        layout: null,
    },
    // http://localhost:3000/tempsetting
    {
        path: '/setting',
        component: Setting,
    },
    // http://localhost:3000/statistic
    {
        path: '/statis',
        component: Statis,
    },
    // http://localhost:3000/climate
    {
        path: '/climate',
        component: Climate,
    },
    // http://localhost:3000/login
    {
        path: '/login',
        component: Login,
    },
    // http://localhost:3000/signup
    {
        path: '/signup',
        component: SignUp,
    },
];

// Sau khi đăng nhập với vào được
const privateRoutes = [];

export { publicRoutes, privateRoutes };
