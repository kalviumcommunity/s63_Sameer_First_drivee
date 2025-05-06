import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">My First Car</h3>
            <p className="text-gray-300">
              Your trusted guide to buying your first car. We help you make informed decisions
              with expert advice and comprehensive tools.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cars" className="text-gray-300 hover:text-white">
                  Find Cars
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-gray-300 hover:text-white">
                  Compare Cars
                </Link>
              </li>
              <li>
                <Link to="/guide" className="text-gray-300 hover:text-white">
                  Buying Guide
                </Link>
              </li>
              <li>
                <Link to="/forum" className="text-gray-300 hover:text-white">
                  Community Forum
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/checklist" className="text-gray-300 hover:text-white">
                  Car Buying Checklist
                </Link>
              </li>
              <li>
                <Link to="/insurance" className="text-gray-300 hover:text-white">
                  Insurance Guide
                </Link>
              </li>
              <li>
                <Link to="/financing" className="text-gray-300 hover:text-white">
                  Financing Options
                </Link>
              </li>
              <li>
                <Link to="/maintenance" className="text-gray-300 hover:text-white">
                  Maintenance Tips
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                <a href="mailto:support@myfirstcar.com" className="hover:text-white">
                  support@myfirstcar.com
                </a>
              </li>
              <li className="text-gray-300">
                <a href="tel:+1234567890" className="hover:text-white">
                  (123) 456-7890
                </a>
              </li>
              <li className="text-gray-300">
                <address className="not-italic">
                  123 Car Street<br />
                  Auto City, AC 12345
                </address>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300">
              © {new Date().getFullYear()} My First Car. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-300 hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 