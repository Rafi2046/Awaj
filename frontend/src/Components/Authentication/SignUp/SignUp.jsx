import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';


const av1 = 'https://i.ibb.co.com/WDZKsKt/image-2024-12-14-172259062.png';
const av2 = 'https://i.ibb.co.com/kKfmnBY/image-2024-12-14-172233890.png';
const av3 = 'https://i.ibb.co.com/vm2ysz7/image-2024-12-14-172209049.png';
const av4 = 'https://i.ibb.co.com/99tmJgF/image-2024-12-14-172147542.png';

const SignUp = () => {

    const { user, createUser, googleSignIn, emailVerification, uploadNameImageID, dUser } = useContext(AuthContext)
    const [proPicS, setProPicS] = useState(av1);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        const form = e.target;
        const fName = form.fName.value;
        const uName = form.uName.value;
        const email = form.email.value;
        const age = form.age.value;
        const bCirtificate = form.bCirtificate.value;
        const proPic = proPicS;
        const password = form.password.value;
        const loginInfo = { fName, uName, email, age, bCirtificate, password }
        console.log(loginInfo);
        createUser(email, password)
            .then(res => {
                console.log(res);
                emailVerification();
                uploadNameImageID(fName, proPic)
                    .then(res => {

                    })
                    .catch(err => {

                    })
                // tor kam ene
                axios.post('../../../../../backend/signup.php', loginInfo)
                    .then(function (response) {
                        console.log(response);
                        navigate('/')
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
            {user ? navigate('/')
                :
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

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Select Avater</span>
                                    </label>
                                    <div className="form-control">
                                        <label className="label cursor-pointer">
                                            <span className="label-text"><img src={av1} className='w-10 rounded-xl' alt="" /></span>
                                            <input onClick={() => setProPicS(av1)} type="radio" name="radio-10" className="radio checked:bg-red-500" defaultChecked required />
                                        </label>

                                        <label className="label cursor-pointer">
                                            <span className="label-text"><img src={av2} className='w-10 rounded-xl' alt="" /></span>
                                            <input onClick={() => setProPicS(av2)} type="radio" name="radio-10" className="radio checked:bg-red-500" required />
                                        </label>

                                        <label className="label cursor-pointer">
                                            <span className="label-text"><img src={av3} className='w-10 rounded-xl' alt="" required /></span>
                                            <input onClick={() => setProPicS(av3)} type="radio" name="radio-10" className="radio checked:bg-red-500" />
                                        </label>

                                        <label className="label cursor-pointer">
                                            <span className="label-text"><img src={av4} className='w-10 rounded-xl' alt="" /></span>
                                            <input onClick={() => setProPicS(av4)} type="radio" name="radio-10" className="radio checked:bg-red-500" required />
                                        </label>
                                    </div>
                                </div>

                                <div className="form-control mt-6">
                                    <input className='btn btn-info' type="submit" value='Sign Up' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}
        </div>
    );
};

export default SignUp;