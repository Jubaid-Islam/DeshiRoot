import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "/images/logo.png"

const NavItem = ({ to, children, onNavigate }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `font-medium transition-colors duration-200 ${
          isActive
            ? 'text-emerald-800 border-b-2 border-emerald-800 pb-1'
            : 'text-gray-600 hover:text-emerald-800'
        }`
      }
      onClick={onNavigate}
    >
      {children}
    </NavLink>
  </li>
);

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">

              <img src={logo} alt="DeshiRoot" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              <NavItem to="/">Home</NavItem>
              <NavItem to="/contact">Contact</NavItem>
              <NavItem to="/about">About Us</NavItem>
            </ul>
          </div>

          {/* Right Side Icons & Cart */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Cart Icon */}
            <Link to="/cart" className="relative text-gray-600 hover:text-emerald-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              {/* Cart Badge (Optional) */}
              <span className="absolute -top-2 -right-2 bg-emerald-800 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                7
              </span>
            </Link>


          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-emerald-800 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full">
          <ul className="px-4 pt-2 pb-4 space-y-4 flex flex-col">
            <NavItem to="/" onNavigate={() => setIsOpen(false)}>Home</NavItem>
            <NavItem to="/contact" onNavigate={() => setIsOpen(false)}>Contact</NavItem>
            <NavItem to="/about" onNavigate={() => setIsOpen(false)}>About Us</NavItem>

          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;