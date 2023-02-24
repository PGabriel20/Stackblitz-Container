import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { session } = useAuth();

  return (
    <div className='app'>
      <h1>Hello</h1>
      {session && <p>Welcome {session.user.username}!</p>}
    </div>
  );
};

export default Home;
