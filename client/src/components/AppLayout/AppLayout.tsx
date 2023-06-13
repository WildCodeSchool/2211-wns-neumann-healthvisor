import React, { ReactNode } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import './AppLayout.scss';

type Props = {
  children: ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <div className="root">
      <Sidebar className="sidebar" open={true} onClose={() => {}} />
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
