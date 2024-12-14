import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Avatar URLs
const avatars = [
  'https://i.ibb.co/WDZKsKt/image-2024-12-14-172259062.png',
  'https://i.ibb.co/kKfmnBY/image-2024-12-14-172233890.png',
  'https://i.ibb.co/vm2ysz7/image-2024-12-14-172209049.png',
  'https://i.ibb.co/99tmJgF/image-2024-12-14-172147542.png',
];

const SignUp = () => {
  const [formData, setFormData] = useState({
    fName: '',
    uName: '',
    email: '',
    age: '',
    bCirtificate: '',
    password: '',
    proPic: avatars[0], // Default avatar
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8000/accounts.php', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setSuccess('Account created successfully!');
        navigate('/'); // Redirect to homepage
      }
    } catch (err) {
      setError('Failed to connect to the server. Please try again later.');
      console.error(err);
    }
  };

  // Handle avatar selection
  const handleAvatarSelect = (url) => {
    setFormData({ ...formData, proPic: url });
  };

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <h1 className="text-xl font-bold text-center">Sign Up</h1>

            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                name="fName"
                placeholder="Full Name"
                className="input input-bordered"
                value={formData.fName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="uName"
                placeholder="Username"
                className="input input-bordered"
                value={formData.uName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Age */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                className="input input-bordered"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            {/* Birth Certificate */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Birth Certificate Number</span>
              </label>
              <input
                type="text"
                name="bCirtificate"
                placeholder="Birth Certificate Number"
                className="input input-bordered"
                value={formData.bCirtificate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="input input-bordered"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Avatar Selection */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Select Avatar</span>
              </label>
              <div className="flex gap-2">
                {avatars.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Avatar ${index + 1}`}
                    className={`w-10 h-10 rounded-full cursor-pointer border-2 ${
                      formData.proPic === url ? 'border-blue-500' : 'border-gray-300'
                    }`}
                    onClick={() => handleAvatarSelect(url)}
                  />
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-info">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
