import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User, Wallet, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 backdrop-blur-lg rounded-2xl px-8 py-4 border border-blue-500/20 shadow-lg my-4 text-white">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Basix IP
            </h1>
            <p className="text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Marketplace
            </p>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <NavLink
                to="/"
                className="px-4 py-3 text-lg font-bold text-white hover:text-cyan-400 hover:bg-blue-500/10 rounded-lg transition-colors"
              >
                Home
              </NavLink>
              <NavLink
                to="/dashboard"
                className="px-4 py-3 text-lg font-bold text-white hover:text-cyan-400 hover:bg-blue-500/10 rounded-lg transition-colors"
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/assets"
                className="px-4 py-3 text-lg font-bold text-white hover:text-cyan-400 hover:bg-blue-500/10 rounded-lg transition-colors"
              >
                Assets
              </NavLink>
              <NavLink
                to="/funding"
                className="px-4 py-3 text-lg font-bold text-white hover:text-cyan-400 hover:bg-blue-500/10 rounded-lg transition-colors"
              >
                Funding
              </NavLink>
            </div>
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 border border-blue-400/20 hover:bg-blue-500/10"
            >
              <User size={16} />
              <span>Login</span>
            </Link>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-6 py-3 rounded-lg transition-all duration-300 font-semibold shadow-lg hover:shadow-blue-500/25 transform hover:scale-105">
              <Wallet size={16} />
              <span>Connect Wallet</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-cyan-400 p-2 rounded-md transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="mx-4 mb-4 px-6 py-4 space-y-2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 backdrop-blur-lg rounded-2xl border border-blue-500/20 shadow-lg text-white">
            <NavLink
              to="/"
              className="block px-4 py-3 font-bold text-white hover:text-cyan-400 hover:bg-blue-500/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className="block px-4 py-3 font-bold text-white hover:text-cyan-400 hover:bg-blue-500/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/assets"
              className="block px-4 py-3 font-bold text-white hover:text-cyan-400 hover:bg-blue-500/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Assets
            </NavLink>
            <NavLink
              to="/funding"
              className="block px-4 py-3 font-bold text-white hover:text-cyan-400 hover:bg-blue-500/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Funding
            </NavLink>
            
            <div className="pt-4 space-y-2">
              <Link
                to="/login"
                className="flex items-center justify-center space-x-2 w-full px-4 py-3 border border-blue-400/20 hover:bg-blue-500/10 text-white rounded-lg transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={16} />
                <span>Login</span>
              </Link>
              <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-4 py-3 rounded-lg flex items-center justify-center space-x-2 font-medium transition-all">
                <Wallet size={16} />
                <span>Connect Wallet</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;