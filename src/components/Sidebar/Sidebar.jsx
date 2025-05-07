import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import { BaseInput } from '../BaseInput/BaseInput';

export default function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/completed', label: 'Completed' }
  ];
  return (
    <aside className="w-64 bg-white shadow-lg relative">
          <div className="p-6">
            <div className='mb-4'>
              <BaseInput placeholder="Basic usage" />
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>
  )
}
