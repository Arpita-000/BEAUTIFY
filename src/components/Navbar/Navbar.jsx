import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { BiSolidOffer } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { ImHome } from "react-icons/im";
import { MdLocalOffer } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContext";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("User signed out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <nav className="flex justify-between items-center px-[5%] py-4 bg-white/80 backdrop-blur-md shadow-sm border-[#C8AAAA]/30 sticky top-0 z-20">
      <Link to="/" className="flex flex-col group">
        <div className="font-['Playfair_Display'] font-bold text-3xl bg-gradient-to-r from-[#8100D1] via-[#B500B2] to-[#FF52A0] bg-clip-text text-transparent tracking-tight">
          Beautify
        </div>
        <p className="font-['Montserrat'] text-xs font-light tracking-wide text-[#B500B2]/70 mt-0.5 group-hover:text-[#FF52A0] transition-colors duration-300 italic">
          ✨ enhance beauty, embrace elegance ✨
        </p>
      </Link>

      <div className="flex gap-2 items-center flex-wrap font-medium">
        <NavLink to="/">
          {({ isActive }) => (
            <div
              className={`relative px-4 py-2 text-[#3a2a3a] hover:text-[#B500B2] transition-all duration-300 flex items-center gap-1 overflow-hidden group ${
                isActive ? "text-[#B500B2]" : ""
              }`}
            >
              <span
                className={`absolute inset-0 bg-gradient-to-r from-[#FF52A0]/10 to-[#B500B2]/10 rounded-full transition-all duration-500 ease-out ${
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                } group-hover:scale-100 group-hover:opacity-100`}
              ></span>

              <span className="relative z-10 flex items-center gap-1">
                Home <ImHome className="text-sm" />
              </span>

              {isActive && (
                <>
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span className="relative flex justify-center">
                      <span className="w-2 h-2 bg-gradient-to-br from-[#FF52A0] to-[#B500B2] rounded-full transform rotate-45 shadow-[0_0_10px_rgba(255,82,160,0.5)]"></span>
                      <span className="absolute inset-0 w-2 h-2 bg-gradient-to-br from-[#FF52A0] to-[#B500B2] rounded-full animate-ping opacity-40"></span>
                    </span>
                  </span>
                  <span className="absolute -bottom-1 left-1/3 w-0.5 h-0.5 bg-[#FFA47F] rounded-full animate-pulse"></span>
                  <span className="absolute -bottom-1 right-1/3 w-0.5 h-0.5 bg-[#FFA47F] rounded-full animate-pulse delay-150"></span>
                </>
              )}
            </div>
          )}
        </NavLink>

        <NavLink to="/category">
          {({ isActive }) => (
            <div
              className={`relative px-4 py-2 text-[#3a2a3a] hover:text-[#B500B2] transition-all duration-300 flex items-center gap-1 overflow-hidden group ${
                isActive ? "text-[#B500B2]" : ""
              }`}
            >
              <span
                className={`absolute inset-0 bg-gradient-to-r from-[#FF52A0]/10 to-[#B500B2]/10 rounded-full transition-all duration-500 ease-out ${
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                } group-hover:scale-100 group-hover:opacity-100`}
              ></span>

              <span className="relative z-10 flex items-center gap-1">
                Category <MdCategory className="text-sm" />
              </span>

              {isActive && (
                <>
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span className="relative flex justify-center">
                      <span className="w-2 h-2 bg-gradient-to-br from-[#FF52A0] to-[#B500B2] rounded-full transform rotate-45 shadow-[0_0_10px_rgba(255,82,160,0.5)]"></span>
                      <span className="absolute inset-0 w-2 h-2 bg-gradient-to-br from-[#FF52A0] to-[#B500B2] rounded-full animate-ping opacity-40"></span>
                    </span>
                  </span>
                  <span className="absolute -bottom-1 left-1/3 w-0.5 h-0.5 bg-[#FFA47F] rounded-full animate-pulse"></span>
                  <span className="absolute -bottom-1 right-1/3 w-0.5 h-0.5 bg-[#FFA47F] rounded-full animate-pulse delay-150"></span>
                </>
              )}
            </div>
          )}
        </NavLink>

        <NavLink to="/cart">
          {({ isActive }) => (
            <div
              className={`relative px-4 py-2 text-[#3a2a3a] hover:text-[#B500B2] transition-all duration-300 flex items-center gap-1 overflow-hidden group ${
                isActive ? "text-[#B500B2]" : ""
              }`}
            >
              <span
                className={`absolute inset-0 bg-gradient-to-r from-[#FF52A0]/10 to-[#B500B2]/10 rounded-full transition-all duration-500 ease-out ${
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                } group-hover:scale-100 group-hover:opacity-100`}
              ></span>

              <span className="relative z-10 flex items-center gap-1">
                Cart <i className="fas fa-shopping-bag text-sm"></i>
              </span>

              {isActive && (
                <>
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span className="relative flex justify-center">
                      <span className="w-2 h-2 bg-gradient-to-br from-[#FF52A0] to-[#B500B2] rounded-full transform rotate-45 shadow-[0_0_10px_rgba(255,82,160,0.5)]"></span>
                      <span className="absolute inset-0 w-2 h-2 bg-gradient-to-br from-[#FF52A0] to-[#B500B2] rounded-full animate-ping opacity-40"></span>
                    </span>
                  </span>
                  <span className="absolute -bottom-1 left-1/3 w-0.5 h-0.5 bg-[#FFA47F] rounded-full animate-pulse"></span>
                  <span className="absolute -bottom-1 right-1/3 w-0.5 h-0.5 bg-[#FFA47F] rounded-full animate-pulse delay-150"></span>
                </>
              )}
            </div>
          )}
        </NavLink>

        <NavLink to="/offers">
          {({ isActive }) => (
            <div
              className={`relative px-4 py-2 text-[#3a2a3a] hover:text-[#B500B2] transition-all duration-300 flex items-center gap-1 overflow-hidden group ${
                isActive ? "text-[#B500B2]" : ""
              }`}
            >
              <span
                className={`absolute inset-0 bg-gradient-to-r from-[#FF52A0]/10 to-[#B500B2]/10 rounded-full transition-all duration-500 ease-out ${
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                } group-hover:scale-100 group-hover:opacity-100`}
              ></span>

              <span className="relative z-10 flex items-center gap-1">
                Offers <BiSolidOffer className="text-sm" />
              </span>

              {isActive && (
                <>
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span className="relative flex justify-center">
                      <span className="w-2 h-2 bg-gradient-to-br from-[#FF52A0] to-[#B500B2] rounded-full transform rotate-45 shadow-[0_0_10px_rgba(255,82,160,0.5)]"></span>
                      <span className="absolute inset-0 w-2 h-2 bg-gradient-to-br from-[#FF52A0] to-[#B500B2] rounded-full animate-ping opacity-40"></span>
                    </span>
                  </span>
                  <span className="absolute -bottom-1 left-1/3 w-0.5 h-0.5 bg-[#FFA47F] rounded-full animate-pulse"></span>
                  <span className="absolute -bottom-1 right-1/3 w-0.5 h-0.5 bg-[#FFA47F] rounded-full animate-pulse delay-150"></span>
                </>
              )}
            </div>
          )}
        </NavLink>

        <NavLink to="/eid-sale">
          {({ isActive }) => (
            <div
              className={`relative px-4 py-2 text-[#3a2a3a] hover:text-[#B500B2] transition-all duration-300 flex items-center gap-1 overflow-hidden group ${
                isActive ? "text-[#B500B2]" : ""
              }`}
            >
              <span
                className={`absolute inset-0 bg-gradient-to-r from-[#FF52A0]/10 to-[#B500B2]/10 rounded-full transition-all duration-500 ease-out ${
                  isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                } group-hover:scale-100 group-hover:opacity-100`}
              ></span>

              <span className="relative z-10 flex items-center gap-1">
                Eid sale <MdLocalOffer className="text-sm" />
              </span>

              {isActive && (
                <>
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <span className="relative flex justify-center">
                      <span className="w-2 h-2 bg-gradient-to-br from-[#FF52A0] to-[#B500B2] rounded-full transform rotate-45 shadow-[0_0_10px_rgba(255,82,160,0.5)]"></span>
                      <span className="absolute inset-0 w-2 h-2 bg-gradient-to-br from-[#FF52A0] to-[#B500B2] rounded-full animate-ping opacity-40"></span>
                    </span>
                  </span>
                  <span className="absolute -bottom-1 left-1/3 w-0.5 h-0.5 bg-[#FFA47F] rounded-full animate-pulse"></span>
                  <span className="absolute -bottom-1 right-1/3 w-0.5 h-0.5 bg-[#FFA47F] rounded-full animate-pulse delay-150"></span>
                </>
              )}
            </div>
          )}
        </NavLink>

        {/* Conditional Auth Section */}
        {user ? (
          <div className="dropdown dropdown-end ml-2">
            <div
              tabIndex={0}
              role="button"
              className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-[#B500B2] transition-all duration-300 cursor-pointer ring-2 ring-[#FFA47F]/30 hover:ring-[#FF52A0]/50 group"
            >
              <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out"></span>

              <img
                src={
                  user.photoURL ||
                  "https://i.ibb.co/cS32smV8/shamblen-studios-xw-M61-TPMl-Yk-unsplash.jpg"
                }
                alt={user.displayName || "User"}
                className="w-full h-full object-cover"
              />
            </div>
            <ul
              tabIndex={-1}
              className="menu dropdown-content bg-white/95 backdrop-blur-md rounded-[20px] z-20 mt-3 w-64 p-2 shadow-[0_10px_40px_-15px_rgba(129,0,209,0.3)] border border-[#FFA47F]/30"
            >
              <li className="mb-1">
                <div className="flex items-center gap-3 p-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#FF52A0]">
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/cS32smV8/shamblen-studios-xw-M61-TPMl-Yk-unsplash.jpg"
                      }
                      alt={user.displayName || "User"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="font-['Playfair_Display'] text-[#8100D1] font-semibold text-sm">
                      {user.displayName || "Beauty User"}
                    </p>
                    <p className="text-[#6b4e6b] text-xs truncate max-w-[150px]">
                      {user.email || "user@beautify.com"}
                    </p>
                  </div>
                </div>
              </li>

              <div className="border-t border-[#FFA47F]/30 my-1"></div>

              <li>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-[#D43B3B] hover:text-white hover:bg-gradient-to-r from-[#FF52A0] to-[#B500B2] rounded-[15px] transition-all duration-200 py-2 px-3 w-full"
                >
                  <i className="fas fa-sign-out-alt text-sm"></i>
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="relative bg-gradient-to-r from-[#8100D1] to-[#B500B2] text-white font-semibold py-2 px-6 rounded-[40px] text-sm shadow-[0_5px_15px_rgba(181,0,178,0.3)] border border-white/30 hover:from-[#B500B2] hover:to-[#FF52A0] hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,82,160,0.4)] transition-all duration-200 flex items-center gap-2 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-700 ease-out"></span>

            <span className="relative z-10 flex items-center gap-2">
              <i className="fas fa-sign-in-alt"></i>
              Login
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
