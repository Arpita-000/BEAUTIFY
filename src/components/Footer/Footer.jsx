import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#8100D1] via-[#470075] to-[#B500B2] text-[#f0e0f0] pt-12 pb-6 border-t-4 border-[#FFA47F]">
      <div className="px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div>
            <h4 className="font-['Playfair_Display'] text-2xl text-white mb-4 border-b-2 border-[#FF52A0] inline-block pb-2">
              Beautify
            </h4>
            <p className="text-[#ffdbdb] text-sm leading-relaxed mb-4">
              Where elegance meets beauty. Curated luxury for the modern woman.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#FF52A0]/30 w-10 h-10 rounded-full flex items-center  justify-center  backdrop-blur-sm border border-[#FFA47F] hover:bg-[#FF52A0] hover:text-[#8100D1] hover:shadow-[0_0_20px_#FF52A0] transition-all duration-200"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#FF52A0]/30 w-10 h-10 rounded-full flex items-center justify-center text-xl backdrop-blur-sm border border-[#FFA47F] hover:bg-[#FF52A0] hover:text-[#8100D1] hover:shadow-[0_0_20px_#FF52A0] transition-all duration-200"
              >
                <i className="fab fa-pinterest"></i>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#FF52A0]/30 w-10 h-10 rounded-full flex items-center justify-center text-xl backdrop-blur-sm border border-[#FFA47F] hover:bg-[#FF52A0] hover:text-[#8100D1] hover:shadow-[0_0_20px_#FF52A0] transition-all duration-200"
              >
                <i className="fab fa-tiktok"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#FF52A0]/30 w-10 h-10 rounded-full flex items-center justify-center text-xl backdrop-blur-sm border border-[#FFA47F] hover:bg-[#FF52A0] hover:text-[#8100D1] hover:shadow-[0_0_20px_#FF52A0] transition-all duration-200"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Explore Column */}
          <div>
            <h4 className="font-['Playfair_Display'] text-2xl text-white mb-4 border-b-2 border-[#FF52A0] inline-block pb-2">
              explore
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/new-arrivals"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i> New arrivals
                </Link>
              </li>
              <li>
                <Link
                  to="/best-sellers"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i> Best sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/gift-sets"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i> Gift sets
                </Link>
              </li>
              <li>
                <Link
                  to="/eid-collection"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i> Eid
                  collection
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-['Playfair_Display'] text-2xl text-white mb-4 border-b-2 border-[#FF52A0] inline-block pb-2">
              support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/contact"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i> Contact us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-returns"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i> Shipping &
                  returns
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i> FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/track-order"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i> Track order
                </Link>
              </li>
            </ul>
          </div>

          {/* Essence Column */}
          <div>
            <h4 className="font-['Playfair_Display'] text-2xl text-white mb-4 border-b-2 border-[#FF52A0] inline-block pb-2">
              the essence
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/our-story"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i> Our story
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i>{" "}
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  to="/beauty-blog"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i> Beauty blog
                </Link>
              </li>
              <li>
                <Link
                  to="/loyalty"
                  className="text-[#ffd0e0] hover:text-[#FFA47F] hover:translate-x-1 transition-all duration-200 flex items-center gap-2"
                >
                  <i className="fas fa-chevron-right text-xs"></i> Loyalty
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center pt-6 border-t border-dashed border-[#C8AAAA] text-[#f0c0d0] text-sm">
          <p>
            © 2025 Beautify —  | All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
