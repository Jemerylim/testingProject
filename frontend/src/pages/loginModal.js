import React, { useState, useEffect } from 'react';
import '../styles/css/LoginModal.css';
import { useAuth } from '../context/AuthContext';
import apiClient from '../axiosConfig';

const LoginModal = ({ isOpen, onClose, isLogin: initialIsLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLogin, setIsLogin] = useState(initialIsLogin);
  const { login } = useAuth();

  useEffect(() => {
    setIsLogin(initialIsLogin);
  }, [initialIsLogin]);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log('Login data to be sent:', { email, password });

    try {
      await login(email, password);
      alert('Login successful');
      onClose();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const name = `${firstName} ${lastName}`;
    const user = {
      name,
      phone_number: phoneNumber,
      email,
      password
    };

    console.log('Data to be sent:', user);

    try {
      const response = await apiClient.post('/auth/register', user);
      if (response.status === 201) {
        alert('User registered successfully');
        onClose();
      } else {
        const error = await response.data;
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="modal-header">
          <h2>{isLogin ? 'Log in to continue' : 'Sign Up to continue'}</h2>
        </div>
        <div className="tab-container">
          <button
            className={`tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Log In
          </button>
          <button
            className={`tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>
        {isLogin && (
          <form onSubmit={handleLogin}>
            <label>
              Email Address:
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <button type="submit">Log In</button>
          </form>
        )}
        {!isLogin && (
          <form onSubmit={handleSignUp}>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="text"
                name="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </label>
            <label>
              Email Address:
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <p className="note">E-tickets will be sent to your email address, please make sure your email address is correct.</p>
            <button type="submit">Continue</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
