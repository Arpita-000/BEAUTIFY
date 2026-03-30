import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";

const Login = () => {
  const { signInUser, signInGoogle, forgetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef();

  const [focusedField, setFocusedField] = useState(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Show floating toast notification
  const showToast = (message, type = "error") => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const hangleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signInGoogle()
      .then((res) => {
        const loggedUser = res.user;
        console.log(loggedUser);
        Swal.fire({
          title: `<span style="font-family: 'Playfair Display', serif; color: #8100D1; font-weight: 600;">Welcome Back!</span>`,
          html: `
    <div style="text-align: center;">
      <div style="background: linear-gradient(145deg, rgba(255,82,160,0.1), rgba(129,0,209,0.05)); padding: 20px; border-radius: 50px; margin-bottom: 10px;">
        <span style="font-family: 'Playfair Display', serif; font-size: 24px; color: #B500B2; font-weight: 600;">${loggedUser.displayName || "Beautiful Soul"}</span>
      </div>
      <p style="color: #6b4e6b; font-family: 'Montserrat', sans-serif; margin-bottom: 5px;">Login Successful</p>
      <p style="color: #FF52A0; font-family: 'Montserrat', sans-serif; font-size: 14px;">
        <i class="fas fa-sparkles" style="color: #FFA47F;"></i> 
        Ready to explore your beauty journey
        <i class="fas fa-sparkles" style="color: #FFA47F;"></i>
      </p>
    </div>
  `,
          icon: "success",
          iconColor: "#FF52A0",
          background: "rgba(255, 255, 255, 0.95)",
          backdrop: `
    rgba(129, 0, 209, 0.2)
    left top
    no-repeat
  `,
          confirmButtonColor: "#B500B2",
          confirmButtonText: "Continue",
          timer: 3500,
          timerProgressBar: true,
          draggable: true,
          customClass: {
            popup:
              "rounded-[32px_16px_32px_16px] shadow-[0_30px_50px_-20px_rgba(129,0,209,0.25)] border border-white/50 backdrop-blur-md",
            confirmButton:
              "bg-gradient-to-r from-[#8100D1] to-[#B500B2] text-white font-semibold py-2.5 px-8 rounded-[40px] text-base shadow-[0_5px_15px_rgba(181,0,178,0.3)] hover:from-[#B500B2] hover:to-[#FF52A0] transition-all duration-200 border-none",
            timerProgressBar: "bg-gradient-to-r from-[#FFA47F] to-[#FF52A0]",
          },
        });

        setTimeout(() => {
          const from = location.state?.from?.pathname;
          if (from && from !== "/login" && from !== "/") {
            navigate(from, { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 3000);
      })
      .catch((err) => {
        // Check if error is due to non-existent user
        if (
          err.code === "auth/user-not-found" ||
          err.message.includes("user-not-found")
        ) {
          showToast(
            "Account not found. Please create an account first.",
            "error",
          );
        } else if (err.code === "auth/popup-closed-by-user") {
          showToast("Sign-in cancelled. Please try again.", "info");
        } else {
          showToast(err.message, "error");
        }
      })
      .finally(() => {
        setIsGoogleLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }
    if (!password) {
      showToast("Password cannot be empty", "error");
      return;
    }

    setIsLoading(true);
    signInUser(email, password)
      .then((res) => {
        const loggedInUser = res.user;
        console.log(loggedInUser);
        Swal.fire({
          title: `<span style="font-family: 'Playfair Display', serif; color: #8100D1; font-weight: 600;">Welcome Back!</span>`,
          html: `
    <div style="text-align: center;">
      <div style="background: linear-gradient(145deg, rgba(255,82,160,0.1), rgba(129,0,209,0.05)); padding: 20px; border-radius: 50px; margin-bottom: 10px;">
        <span style="font-family: 'Playfair Display', serif; font-size: 24px; color: #B500B2; font-weight: 600;">${loggedInUser.displayName || "Beautiful Soul"}</span>
      </div>
      <p style="color: #6b4e6b; font-family: 'Montserrat', sans-serif; margin-bottom: 5px;">Login Successful</p>
      <p style="color: #FF52A0; font-family: 'Montserrat', sans-serif; font-size: 14px;">
        <i class="fas fa-sparkles" style="color: #FFA47F;"></i> 
        Ready to explore your beauty journey
        <i class="fas fa-sparkles" style="color: #FFA47F;"></i>
      </p>
    </div>
  `,
          icon: "success",
          iconColor: "#FF52A0",
          background: "rgba(255, 255, 255, 0.95)",
          backdrop: `
    rgba(129, 0, 209, 0.2)
    left top
    no-repeat
  `,
          confirmButtonColor: "#B500B2",
          confirmButtonText: "Continue",
          timer: 3500,
          timerProgressBar: true,
          draggable: true,
          customClass: {
            popup:
              "rounded-[32px_16px_32px_16px] shadow-[0_30px_50px_-20px_rgba(129,0,209,0.25)] border border-white/50 backdrop-blur-md",
            confirmButton:
              "bg-gradient-to-r from-[#8100D1] to-[#B500B2] text-white font-semibold py-2.5 px-8 rounded-[40px] text-base shadow-[0_5px_15px_rgba(181,0,178,0.3)] hover:from-[#B500B2] hover:to-[#FF52A0] transition-all duration-200 border-none",
            timerProgressBar: "bg-gradient-to-r from-[#FFA47F] to-[#FF52A0]",
          },
        });

        e.target.reset();
        setTimeout(() => {
          const from = location.state?.from?.pathname;
          if (from && from !== "/login" && from !== "/") {
            navigate(from, { replace: true });
          } else {
            navigate("/", { replace: true });
          }
        }, 3000);
      })
      .catch((err) => {
        // Check for user not found error
        if (
          err.code === "auth/user-not-found" ||
          err.message.includes("user-not-found")
        ) {
          showToast(
            "Account not found. Please create an account first.",
            "error",
          );
        } else if (err.code === "auth/wrong-password") {
          showToast("Incorrect password. Please try again.", "error");
        } else if (err.code === "auth/invalid-credential") {
          showToast(
            "Invalid credentials. Account not found or password incorrect.",
            "error",
          );
        } else {
          showToast(err.message, "error");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (!email) {
      showToast("Please enter your email address to reset password.", "info");
      return;
    }
    forgetPassword(email)
      .then(() => {
        Swal.fire({
          title: `<span style="font-family: 'Playfair Display', serif; color: #8100D1; font-weight: 600;">Email Sent!</span>`,
          html: `
    <div style="text-align: center;">
      <div style="background: rgba(255,82,160,0.1); padding: 15px; border-radius: 50px; margin-top: 5px;">
        <p style="color: #B500B2; font-family: 'Montserrat', sans-serif; font-weight: 500; margin: 0; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <i class="fas fa-envelope" style="color: #FF52A0;"></i>
          Password reset mail sent
        </p>
      </div>
      <p style="color: #6b4e6b; font-family: 'Montserrat', sans-serif; font-size: 13px; margin-top: 10px;">
        Please check your inbox and follow the instructions.
      </p>
    </div>
  `,
          icon: "success",
          iconColor: "#FF52A0",
          background: "rgba(255, 255, 255, 0.95)",
          backdrop: `
    rgba(129, 0, 209, 0.2)
    left top
    no-repeat
  `,
          confirmButtonColor: "#B500B2",
          confirmButtonText: "Continue",
          timer: 3500,
          timerProgressBar: true,
          showClass: {
            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
          },
          hideClass: {
            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
          },
          customClass: {
            popup:
              "rounded-[32px_16px_32px_16px] shadow-[0_30px_50px_-20px_rgba(129,0,209,0.25)] border border-white/50 backdrop-blur-md",
            confirmButton:
              "bg-gradient-to-r from-[#8100D1] to-[#B500B2] text-white font-semibold py-2.5 px-8 rounded-[40px] text-base shadow-[0_5px_15px_rgba(181,0,178,0.3)] hover:from-[#B500B2] hover:to-[#FF52A0] transition-all duration-200 border-none",
            timerProgressBar: "bg-gradient-to-r from-[#FFA47F] to-[#FF52A0]",
          },
        });
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          showToast(
            "No account found with this email. Please register first.",
            "error",
          );
        } else {
          showToast(err.message, "error");
        }
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-[5%] bg-gradient-to-br from-[#fdfaff] via-[#faf5fa] to-[#fdfaff] bg-[radial-gradient(circle_at_10%_30%,rgba(255,82,160,0.03)_0%,transparent_30%),radial-gradient(circle_at_90%_70%,rgba(129,0,209,0.03)_0%,transparent_40%)] relative">
      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border ${
              toastMessage.type === "error"
                ? "bg-gradient-to-r from-red-50 to-red-100 border-red-300"
                : toastMessage.type === "info"
                  ? "bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300"
                  : "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                toastMessage.type === "error"
                  ? "bg-red-200"
                  : toastMessage.type === "info"
                    ? "bg-blue-200"
                    : "bg-yellow-200"
              }`}
            >
              {toastMessage.type === "error" ? (
                <i className="fas fa-exclamation-circle text-red-600 text-xl"></i>
              ) : toastMessage.type === "info" ? (
                <i className="fas fa-info-circle text-blue-600 text-xl"></i>
              ) : (
                <i className="fas fa-exclamation-triangle text-yellow-600 text-xl"></i>
              )}
            </div>
            <div className="flex-1">
              <p
                className={`font-semibold ${
                  toastMessage.type === "error"
                    ? "text-red-700"
                    : toastMessage.type === "info"
                      ? "text-blue-700"
                      : "text-yellow-700"
                }`}
              >
                {toastMessage.message}
              </p>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row max-w-6xl w-full bg-white/75 backdrop-blur-md rounded-[32px_16px_32px_16px] shadow-[0_30px_50px_-20px_rgba(129,0,209,0.25),0_0_0_1px_rgba(200,170,170,0.2)] border border-white/50 overflow-hidden">
        {/* Left side - Login Form */}
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          <h2 className="font-['Playfair_Display'] text-3xl lg:text-4xl font-semibold text-[#8100D1] mb-2">
            welcome back
          </h2>
          <div className="text-[#6b4e6b] mb-8 font-light border-l-4 border-[#FF52A0] pl-4">
            sign in to your beauty account
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 fieldset">
            {/* Email Field */}
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#8100D1] tracking-wide"
              >
                Email
              </label>
              <div className="relative">
                <i
                  className={`fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-[#C8AAAA] transition-colors duration-200 ${focusedField === "email" ? "text-[#B500B2]" : ""}`}
                ></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  ref={emailRef}
                  disabled={isLoading}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3 bg-[#fff5fa]/60 border-2 border-[#e4d0e4] rounded-[34px] text-gray-800 focus:border-[#B500B2] focus:bg-white focus:shadow-[0_0_0_4px_rgba(181,0,178,0.1)] outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="ella@beautify.com"
                />
              </div>
            </div>

            {/* Password Field with Eye Toggle */}
            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#8100D1] tracking-wide"
              >
                Password
              </label>
              <div className="relative">
                <i
                  className={`fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-[#C8AAAA] transition-colors duration-200 z-10 ${focusedField === "password" ? "text-[#B500B2]" : ""}`}
                ></i>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  disabled={isLoading}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-12 py-3 bg-[#fff5fa]/60 border-2 border-[#e4d0e4] rounded-[34px] text-gray-800 focus:border-[#B500B2] focus:bg-white focus:shadow-[0_0_0_4px_rgba(181,0,178,0.1)] outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="• • • • • • • •"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C8AAAA] hover:text-[#B500B2] transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  tabIndex="-1"
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-lg`}
                  ></i>
                </button>
              </div>

              {/* Error message removed from here - now using toast only */}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm text-[#5f4d5f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                  className="w-4 h-4 accent-[#FF52A0] rounded border-[#C8AAAA] disabled:opacity-50"
                />
                <span>Remember me</span>
              </label>
              <button
                onClick={handleForgetPassword}
                className="text-[#B500B2] text-sm font-medium no-underline border-b border-dashed border-[#FFA47F] hover:text-[#8100D1] hover:border-[#FF52A0] transition-all duration-200"
              >
                forgot password?
              </button>
            </div>

            {/* Sign In Button with Loading Spinner */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#8100D1] to-[#B500B2] text-white font-semibold py-3.5 rounded-[50px] text-lg shadow-[0_8px_20px_rgba(181,0,178,0.3)] border border-white/30 hover:from-[#B500B2] hover:to-[#FF52A0] hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(255,82,160,0.4)] transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-arrow-right-to-bracket"></i> sign in
                </>
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              onClick={hangleGoogleSignIn}
              disabled={isGoogleLoading}
              className="flex-1 btn bg-gradient-to-r from-white to-gray-50 text-black border border-[#e5e5e5] hover:from-white hover:to-pink-50 hover:border-[#FF52A0] hover:shadow-[0_0_20px_rgba(255,82,160,0.5),0_4px_12px_rgba(255,82,160,0.3)] rounded-full px-5 py-2.5 normal-case font-medium text-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center gap-2 min-h-0 h-auto group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-[#8100D1]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg
                    aria-label="Google logo"
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="group-hover:scale-110 transition-transform duration-200"
                  >
                    <g>
                      <path d="m0 0H512V512H0" fill="#fff"></path>
                      <path
                        fill="#34a853"
                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                      ></path>
                      <path
                        fill="#4285f4"
                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                      ></path>
                      <path
                        fill="#fbbc02"
                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                      ></path>
                      <path
                        fill="#ea4335"
                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                      ></path>
                    </g>
                  </svg>
                  <span className="group-hover:text-[#8100D1] transition-colors duration-200">
                    Google
                  </span>
                </>
              )}
            </button>

            <button
              disabled={isLoading || isGoogleLoading}
              className="flex-1 btn bg-gradient-to-r from-[#1877F2] to-[#0e5fd7] text-white border border-[#1877F2] hover:from-[#FF52A0] hover:to-[#B500B2] hover:border-[#FF52A0] hover:shadow-[0_0_20px_rgba(255,82,160,0.6),0_4px_15px_rgba(255,82,160,0.4)] rounded-full px-5 py-2.5 normal-case font-medium text-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] flex items-center justify-center gap-2 min-h-0 h-auto group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                aria-label="Facebook logo"
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="group-hover:scale-110 transition-transform duration-200"
              >
                <path
                  fill="white"
                  d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
                ></path>
              </svg>
              <span>Facebook</span>
            </button>
          </div>

          {/* Create Account Prompt */}
          <div className="mt-8 text-center text-[#6b4e6b] text-base">
            New to Beautify?{" "}
            <Link
              to="/register"
              className="text-[#B500B2] font-semibold no-underline border-b-2 border-[#FFA47F] hover:text-[#8100D1] hover:border-[#FF52A0] transition-all duration-200"
            >
              create account
            </Link>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="flex-1 relative bg-gradient-to-br from-[#FFA47F]/10 to-[#C8AAAA]/10 overflow-hidden min-h-[500px] lg:min-h-[600px]">
          <img
            src="https://i.ibb.co/cS32smV8/shamblen-studios-xw-M61-TPMl-Yk-unsplash.jpg"
            alt="beauty model"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Soft overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#8100D1]/20 via-transparent to-transparent"></div>

          {/* Floating quote */}
          <div className="absolute bottom-8 left-8 text-white font-['Playfair_Display'] text-lg lg:text-xl drop-shadow-lg bg-[#8100D1]/40 backdrop-blur-sm px-5 py-2.5 rounded-[40px] border border-white/40 flex items-center gap-2 z-10">
            <i className="fas fa-sparkles text-[#FFA47F]"></i> radiant access
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
