import React, { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';

const SignUp = () => {

    const { user, createUser, googleSignIn, emailVerification, uploadNameImageID, dUser } = useContext(AuthContext)


    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fName = form.fName.value;
        const uName = form.uName.value;
        const email = form.email.value;
        const age = form.age.value;
        const bCirtificate = form.bCirtificate.value;
        const password = form.password.value;
        const loginInfo = { fName, uName, email, age, bCirtificate, password }
        console.log(loginInfo);
        createUser(email, password)
            .then(res => {
                console.log(res);
                emailVerification();
                
                // tor kam ene
                axios.post('../../../../../backend/signup.php', loginInfo)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                

            })
            .catch(error => {
                console.log(error);
            })
    }


    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSignUp} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Name</span>
                                </label>
                                <input type="text" placeholder="Full Name" name="fName" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <input type="text" placeholder="Username" name="uName" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" name="email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Age</span>
                                </label>
                                <input type="text" placeholder="Age" name="age" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Birth cirtificate no</span>
                                </label>
                                <input type="text" placeholder="Birth cirtificate no" name="bCirtificate" className="input input-bordered" required />
                            </div>


                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                            </div>

                            <div className="form-control mt-6">
                                <input className='btn btn-info' type="submit" value='Sign Up' />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;