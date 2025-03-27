import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { login } from './redux/authSlice';

export const Login = () => {
  const [loginData, setLoginData] = useState({
    Email: '',
    Password: '',
  });
  
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="Email" value={loginData.Email} onChange={handleChange} required />
        </label>

        <label>
          Password:
          <input type="password" name="Password" value={loginData.Password} onChange={handleChange} required />
        </label>

        <button type="submit">Login</button>
      </form>
      {authStatus && <p>{authStatus}</p>}
      <p>Don't have an account? <a href="">Sign up</a></p>
    </div>
  );
};
