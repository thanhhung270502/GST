import { login } from '~/api/api';
import './login.scss';
import { useState } from 'react';

function Login() {
    const [data, setData] = useState({
        username: null,
        password: null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await login(data);
        console.log(res);
        window.location.href = '../';
    };
    return (
        <div className="log__container">
            <div className="log__title">Login</div>
            <div className="log__form">
                <form onSubmit={handleSubmit}>
                    <div class="form-floating mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="username"
                            name="username"
                            onChange={handleChange}
                        />
                        <label for="floatingInput">Username</label>
                    </div>
                    <div class="form-floating mb-4">
                        <input
                            type="password"
                            class="form-control"
                            id="floatingPassword"
                            placeholder="Password"
                            name="password"
                            onChange={handleChange}
                        />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="log__btn">
                            Login
                        </button>
                        <a href="./signup" className="log__btn log__link">
                            Sign Up
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
