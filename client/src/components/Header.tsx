import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// import { Container } from './styles';

const Header: React.FC = () => {
  const { session, handleSignOut } = useAuth();

  return (
    <header>
      <nav>
        <Link to='/'>Home</Link>
        {session && <Link to='/dashboard'>Dashboard</Link>}
        {session ? (
          <button type='button' onClick={handleSignOut}>
            Sign out
          </button>
        ) : (
          <Link to='signin'>Sign in</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
