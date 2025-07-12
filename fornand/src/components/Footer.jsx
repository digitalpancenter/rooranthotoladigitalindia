import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 px-4 lg:px-20 py-12 text-gray-600">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding and Social */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl font-bold text-black">🏨 R.A DIGITAL INDIA</div>
          </div>
          <p className="text-sm mb-4">
            Discover the world's most extraordinary places to stay, from boutique hotels to luxury villas and private islands.
          </p>
          <div className="flex gap-4 text-xl text-gray-500">
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-md font-semibold text-black mb-3">COMPANY</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Partners</a></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h4 className="text-md font-semibold text-black mb-3">SUPPORT</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Information</a></li>
            <li><a href="#">Cancellation Options</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h4 className="text-md font-semibold text-black mb-3">STAY UPDATED</h4>
          <p className="text-sm mb-4">
            Subscribe to our newsletter for travel inspiration and special offers.
          </p>
          <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 w-full focus:outline-none"
            />
            <button className="bg-black text-white px-4 py-2">
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pt-6 border-t border-gray-200 text-sm flex flex-col md:flex-row justify-between items-center text-gray-400">
        <p>© 2025 R.A DIGITAL INDIA All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
