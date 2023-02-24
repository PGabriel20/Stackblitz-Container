import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SignIn: React.FC = () => {
  const { handleSignIn: Login, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (session) {
      navigate('/');
    }
  }, [session, navigate]);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    const { username, password } = credentials;
    await Login(username, password);
  };

  return (
    <div className='App'>
      <form onSubmit={handleSignIn}>
        <fieldset>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            type='text'
          />
        </fieldset>
        <fieldset>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            type='password'
          />
        </fieldset>
        <button type='submit'>Sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
