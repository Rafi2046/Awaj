import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

const LogIn = () => {


    const { user, logIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogIn = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const pass = form.pass.value;
        logIn(email, pass)
            .then(res => {
                navigate('/')
            })
            .catch(err => { })
    }

    return (
        <div>
            {user ? navigate('/')
                :
                <div className="hero min-h-screen">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form onSubmit={handleLogIn} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input name='pass' type="password" placeholder="password" className="input input-bordered" required />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-info">Login</button>
                                </div>
                                <div>No account? <Link to='/signup'><span className='link link-error'>Sign up</span></Link></div>
                            </form>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default LogIn;