import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

const NotFound: React.FC = () => {
  return (
    <div>
      <h1>Essa pagina não existe</h1>
      <Link to='/'>Voltar a home</Link>
    </div>
  );
};

export default NotFound;
