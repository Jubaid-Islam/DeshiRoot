import { Link } from 'react-router-dom';
import logo from "/images/logo.png"

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="DeshiRoot" className="h-10 w-auto" />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium dehydrated fruit slices, sourced directly from local farmers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-emerald-800 text-sm transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-emerald-800 text-sm transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-emerald-800 text-sm transition-colors">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span>Chattogram, Bangladesh</span>
              </li>
              <li className="flex items-start gap-2">
                <span>+880 1890-082701</span>
              </li>
              <li className="flex items-start gap-2">
                <span>tasmanelahee@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 tracking-wider uppercase mb-4">Stay Fresh</h3>
            <p className="text-gray-600 text-sm mb-4">Subscribe for exclusive offers and new arrivals.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent text-sm w-full"
                required
              />
              <button
                type="submit"
                className="bg-emerald-800 text-white font-semibold px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors w-full"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} DeshiRoot. All rights reserved by <a className='text-emerald-700 font-bold' href="https://jubaid-portfolio.vercel.app">Jubaid</a>.
          </p>
          <div className="flex space-x-6">
            <Link className="text-sm text-gray-500 hover:text-emerald-800">Privacy Policy</Link>
            <Link className="text-sm text-gray-500 hover:text-emerald-800">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;