import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Header = () => {
  const [user] = useAuthState(auth);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 animate-fade-in">
          {/* Logo */}
          <Link to="/" className="flex items-center transform hover:scale-105 transition-transform duration-300">
            <img src="/Logo_GadgetBazar.png" alt="GadgetBazar" className="h-10 w-auto" />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 bg-white/50 backdrop-blur-lg border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white/80 transition-all duration-300 shadow-sm"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 text-gray-400 hover:text-blue-600"
              >
                <SearchIcon />
              </button>
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/cart" className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-transform duration-200" title="Cart">
                  <ShoppingCartIcon />
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-transform duration-200" title="Profile">
                  <PersonIcon />
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600 transform hover:scale-110 transition-transform duration-200"
                  title="Logout"
                >
                  <LogoutIcon />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-transform duration-200" title="Login">
                  <LoginIcon />
                </Link>
                <Link to="/signup" className="text-gray-600 hover:text-blue-600 transform hover:scale-110 transition-transform duration-200" title="Sign Up">
                  <PersonAddIcon />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;