import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom';
import { Input } from 'antd';

export default function DefaultLayouts() {

    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <Sidebar />
  
        <main className="flex-1 overflow-auto">
          <div className="mx-auto h-full">
            <Outlet />
          </div>
        </main>
      </div>
    );
}
