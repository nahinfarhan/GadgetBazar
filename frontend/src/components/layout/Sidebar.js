import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '📱', label: 'Smartphones', path: '/category/smartphones' },
    { icon: '💻', label: 'Laptops', path: '/category/laptops' },
    { icon: '🎧', label: 'Audio', path: '/category/audio' },
    { icon: '🎮', label: 'Gaming', path: '/category/gaming' },
    { icon: '⌚', label: 'Wearables', path: '/category/wearables' },
  ];

  const userMenuItems = user ? [
    { icon: '👤', label: 'Profile', path: '/profile' },
    { icon: '🛒', label: 'Cart', path: '/cart' },
    { icon: '❤️', label: 'Wishlist', path: '/wishlist' },
    { icon: '📦', label: 'Orders', path: '/orders' },
  ] : [];

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onMouseEnter={() => setIsOpen(true)}
        className="fixed left-4 top-32 z-50 bg-white/80 backdrop-blur-lg border border-white/20 p-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        onMouseLeave={() => setIsOpen(false)}
        className={`w-72 bg-white/90 backdrop-blur-xl border-r border-white/20 h-full fixed left-0 top-28 bottom-0 overflow-y-auto shadow-2xl z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
        {/* Main Menu */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Categories</h3>
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-blue-500/20 backdrop-blur-lg text-blue-600 font-medium shadow-lg'
                    : 'text-gray-700 hover:bg-white/50 hover:backdrop-blur-lg hover:text-blue-600 hover:shadow-md'
                } transform hover:translate-x-2`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* User Menu */}
        {user && (
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">My Account</h3>
            <nav className="space-y-1">
              {userMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-2xl transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-blue-500/20 backdrop-blur-lg text-blue-600 font-medium shadow-lg'
                      : 'text-gray-700 hover:bg-white/50 hover:backdrop-blur-lg hover:text-blue-600 hover:shadow-md'
                  } transform hover:translate-x-2`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">Quick Links</h3>
          <nav className="space-y-1">
            <Link
              to="/deals"
              className="flex items-center px-4 py-3 rounded-2xl text-red-600 hover:bg-red-500/10 hover:backdrop-blur-lg hover:shadow-md transition-all duration-200 transform hover:translate-x-2"
            >
              <span className="text-xl mr-3">🔥</span>
              <span className="font-medium">Hot Deals</span>
            </Link>
            <Link
              to="/support"
              className="flex items-center px-4 py-3 rounded-2xl text-gray-700 hover:bg-white/50 hover:backdrop-blur-lg hover:text-blue-600 hover:shadow-md transition-all duration-200 transform hover:translate-x-2"
            >
              <span className="text-xl mr-3">💬</span>
              <span>Support</span>
            </Link>
          </nav>
        </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;