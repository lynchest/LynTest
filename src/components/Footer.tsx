import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-6 text-center text-sm text-gray-500 dark:text-gray-400">
      <div className="container mx-auto px-4">
        <p>
          &copy; {new Date().getFullYear()} LynTest. Tüm hakları saklıdır.
        </p>
        <div className="mt-2 flex justify-center space-x-4">
          <Link to="/privacy" className="hover:underline">
            Gizlilik Politikası
          </Link>
          <Link to="/terms" className="hover:underline">
            Kullanım Koşulları
          </Link>
          <Link to="/about" className="hover:underline">
            Hakkımızda
          </Link>
          <Link to="/contact" className="hover:underline">
            İletişim
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
