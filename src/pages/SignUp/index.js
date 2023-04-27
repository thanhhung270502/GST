import './login.scss';

function SignUp() {
    return (
        <div className="log__container">
            <div className="log__title">Create Account</div>
            <div className="log__form">
                <form action="" method="GET">
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="floatingInput" placeholder="username" />
                        <label for="floatingInput">Name</label>
                    </div>
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="floatingInput" placeholder="username" />
                        <label for="floatingInput">Username</label>
                    </div>
                    <div class="form-floating mb-4">
                        <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <input type="submit" className="log__btn" value="Create" />
                        <a href='./login' className='log__btn log__link'>Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
