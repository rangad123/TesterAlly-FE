import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex-1 p-6">
      <div className="bg-white rounded-lg shadow-md">
        {children}
      </div>
    </div>
  );
};

export default Layout;