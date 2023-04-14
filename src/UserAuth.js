import React, { useState } from 'react';

const UserAuth = ({ response, setResponse, rating, setRating, getUsername }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin]   = useState(true);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl = isLogin ? 'http://127.0.0.1:5000/login' : 'http://127.0.0.1:5000/register';
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
  });

  const data = await response.json();
    setResponse( data.message )
    setRating( data.rating )
    getUsername(username)
    console.log(data);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="user-auth">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <div className='flex text-center'>
        Not signed up? <button className='btn-link' onClick={toggleAuthMode}>{isLogin ? 'Register' : 'Login'}</button>
      </div>
      { response && <div className="alert alert-success">
        {response}{ !isLogin ? '. Please login.' : null }
      </div>
      }
    </div>
  );
};

export default UserAuth;
