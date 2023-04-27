import { useState } from 'react';
import './signup.scss';
import { signup } from '~/api/api';

function SignUp() {
    const [data, setData] = useState({
        username: null,
        password: null,
        name: null,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signup(data);
        window.location.href = './login';
    };

    const handleChange = async (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="log__container">
            <div className="log__title">Create Account</div>
            <div className="log__form">
                <form onSubmit={handleSubmit}>
                    <div class="form-floating mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="name"
                            name="name"
                            onChange={handleChange}
                        />
                        <label for="floatingInput">Name</label>
                    </div>
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
                    <div class="form-floating mb-3">
                        <input
                            type="text"
                            class="form-control"
                            id="floatingInput"
                            placeholder="avatar"
                            name="avatar"
                            onChange={handleChange}
                        />
                        <label for="floatingInput">Avatar</label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <button type="submit" className="log__btn">Create</button>
                        <a href="./login" className="log__btn log__link">
                            Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
