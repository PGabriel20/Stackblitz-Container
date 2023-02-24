import React from 'react';
import Header from '../components/Header';

interface IDefaultLayout {
  children: React.ReactNode;
}

const Default: React.FC<IDefaultLayout> = ({ children }) => {
  return (
    <div className='app'>
      <Header />
      {children}
    </div>
  );
};

export default Default;
