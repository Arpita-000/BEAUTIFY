import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { registerUser, signInGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const [error, setError] = useState("");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;

  const setErrorMsg = (msg) => {
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true);
    signInGoogle()
      .then((res) => {
        const userInfo = res.user;
        console.log(userInfo);

        Swal.fire({
          title: `<span style="font-family: 'Playfair Display', serif; color: #8100D1; font-weight: 600;">Welcome to Beautify!</span>`,
          html: `
            <div style="text-align: center;">
              <div style="background: linear-gradient(145deg, rgba(255,82,160,0.1), rgba(129,0,209,0.05)); padding: 20px; border-radius: 50px; margin-bottom: 10px;">
                <span style="font-family: 'Playfair Display', serif; font-size: 20px; color: #B500B2; font-weight: 600;">${userInfo.displayName || "Beautiful Soul"}</span>
              </div>
              <p style="color: #6b4e6b; font-family: 'Montserrat', sans-serif;">Account created successfully with Google!</p>
              <p style="color: #FF52A0; font-family: 'Montserrat', sans-serif; font-size: 13px; margin-top: 5px;">
                <i class="fas fa-sparkles" style="color: #FFA47F;"></i> 
                Redirecting to login...
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
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          customClass: {
            popup:
              "rounded-[32px_16px_32px_16px] shadow-[0_30px_50px_-20px_rgba(129,0,209,0.25)] border border-white/50 backdrop-blur-md",
            timerProgressBar: "bg-gradient-to-r from-[#FFA47F] to-[#FF52A0]",
          },
        });

        // Redirect to login page after successful Google sign-up
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((err) => {
        if (err.code === "auth/popup-closed-by-user") {
          setErrorMsg("Sign-up cancelled. Please try again.");
        } else if (
          err.code === "auth/account-exists-with-different-credential"
        ) {
          setErrorMsg(
            "An account already exists with the same email address using different sign-in method.",
          );
        } else {
          setErrorMsg(err.message);
        }
      })
      .finally(() => {
        setIsGoogleLoading(false);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.fname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const repassword = e.target.repassword.value;
    const img = e.target.photo.value;

    console.log(name, email, password, repassword, img);

    if (password !== repassword) {
      setErrorMsg("Passwords do not match");
      return;
    } else if (password.length < 6 || repassword.length < 6) {
      setErrorMsg("Password must be at least 6 characters");
      return;
    } else if (!passwordRegex.test(repassword)) {
      setErrorMsg(
        "Password must be at least 6 characters with uppercase, lowercase, number, and special character",
      );
      return;
    } else {
      setIsLoading(true);
      registerUser(email, repassword)
        .then((res) => {
          const userInfo = res.user;
          console.log(userInfo);

          updateProfile(userInfo, {
            displayName: name,
            photoURL: img,
          })
            .then(() => {
              console.log("Profile Updated For current user");
              sendEmailVerification(userInfo);
            })
            .catch((err) => {
              setErrorMsg(err.message);
            });

          Swal.fire({
            title: `<span style="font-family: 'Playfair Display', serif; color: #8100D1; font-weight: 600;">Account Created Successfully</span>`,
            html: `
    <div style="text-align: center;">
      <p style="color: #6b4e6b; font-family: 'Montserrat', sans-serif; margin-bottom: 8px;">Your account has been created successfully.</p>
      <p style="color: #B500B2; font-family: 'Montserrat', sans-serif; font-weight: 500; background: rgba(255,82,160,0.1); padding: 10px; border-radius: 50px; border-left: 3px solid #FF52A0;">
        <i class="fas fa-envelope" style="color: #FF52A0; margin-right: 8px;"></i>
        A verification email has been sent to your account. Please verify.
      </p>
      <p style="color: #FF52A0; font-family: 'Montserrat', sans-serif; font-size: 13px; margin-top: 10px;">
        <i class="fas fa-sparkles" style="color: #FFA47F;"></i> 
        Redirecting to login...
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
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
              popup:
                "rounded-[32px_16px_32px_16px] shadow-[0_30px_50px_-20px_rgba(129,0,209,0.25)] border border-white/50 backdrop-blur-md",
              timerProgressBar: "bg-gradient-to-r from-[#FFA47F] to-[#FF52A0]",
            },
          });
          e.target.reset();

          setTimeout(() => {
            navigate("/login");
          }, 5000);
        })
        .catch((err) => {
          console.log(err.message);
          setErrorMsg(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="py-8 px-[5%] bg-gradient-to-br from-[#fdfaff] via-[#faf5fa] to-[#fdfaff] bg-[radial-gradient(circle_at_10%_30%,rgba(255,82,160,0.03)_0%,transparent_30%),radial-gradient(circle_at_90%_70%,rgba(129,0,209,0.03)_0%,transparent_40%)]">
      <div className="flex flex-col lg:flex-row max-w-6xl mx-auto bg-white/75 backdrop-blur-md rounded-[32px_16px_32px_16px] shadow-[0_30px_50px_-20px_rgba(129,0,209,0.25),0_0_0_1px_rgba(200,170,170,0.2)] border border-white/50 overflow-hidden">
        {/* Left side - Registration Form */}
        <div className="flex-1 p-6 lg:p-10 flex flex-col justify-center">
          <h2 className="font-['Playfair_Display'] text-2xl lg:text-3xl font-semibold text-[#8100D1] mb-1">
            create account
          </h2>
          <div className="text-[#6b4e6b] mb-4 font-light border-l-4 border-[#FF52A0] pl-3 text-sm">
            join the beauty community
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 fieldset">
            {/* Full Name Field */}
            <div className="space-y-0.5">
              <label
                htmlFor="fullName"
                className="text-xs font-medium text-[#8100D1] tracking-wide"
              >
                FULL NAME
              </label>
              <div className="relative">
                <i
                  className={`fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-[#C8AAAA] text-sm transition-colors duration-200 ${focusedField === "fullName" ? "text-[#B500B2]" : ""}`}
                ></i>
                <input
                  type="text"
                  id="fullName"
                  name="fname"
                  disabled={isLoading}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#fff5fa]/60 border-2 border-[#e4d0e4] rounded-[30px] text-sm text-gray-800 focus:border-[#B500B2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,0,178,0.1)] outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter Your Full Name"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-0.5">
              <label
                htmlFor="email"
                className="text-xs font-medium text-[#8100D1] tracking-wide"
              >
                EMAIL
              </label>
              <div className="relative">
                <i
                  className={`fas fa-envelope absolute left-3 top-1/2 -translate-y-1/2 text-[#C8AAAA] text-sm transition-colors duration-200 ${focusedField === "email" ? "text-[#B500B2]" : ""}`}
                ></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  disabled={isLoading}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#fff5fa]/60 border-2 border-[#e4d0e4] rounded-[30px] text-sm text-gray-800 focus:border-[#B500B2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,0,178,0.1)] outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter Your Email"
                  required
                />
              </div>
            </div>

            {/* Profile Photo URL Field */}
            <div className="space-y-0.5">
              <label
                htmlFor="photoUrl"
                className="text-xs font-medium text-[#8100D1] tracking-wide"
              >
                PROFILE PHOTO URL{" "}
                <span className="text-[#C8AAAA] font-light text-xs">
                  (optional)
                </span>
              </label>
              <div className="relative">
                <i
                  className={`fas fa-camera absolute left-3 top-1/2 -translate-y-1/2 text-[#C8AAAA] text-sm transition-colors duration-200 ${focusedField === "photoUrl" ? "text-[#B500B2]" : ""}`}
                ></i>
                <input
                  type="url"
                  id="photoUrl"
                  name="photo"
                  disabled={isLoading}
                  onFocus={() => setFocusedField("photoUrl")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#fff5fa]/60 border-2 border-[#e4d0e4] rounded-[30px] text-sm text-gray-800 focus:border-[#B500B2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,0,178,0.1)] outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>

            {/* Password Field with Toggle */}
            <div className="space-y-0.5">
              <label
                htmlFor="password"
                className="text-xs font-medium text-[#8100D1] tracking-wide"
              >
                PASSWORD
              </label>
              <div className="relative">
                <i
                  className={`fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-[#C8AAAA] text-sm transition-colors duration-200 z-10 ${focusedField === "password" ? "text-[#B500B2]" : ""}`}
                ></i>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  disabled={isLoading}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-9 pr-10 py-2.5 bg-[#fff5fa]/60 border-2 border-[#e4d0e4] rounded-[30px] text-sm text-gray-800 focus:border-[#B500B2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,0,178,0.1)] outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C8AAAA] hover:text-[#B500B2] transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  tabIndex="-1"
                  disabled={isLoading}
                >
                  <i
                    className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}
                  ></i>
                </button>
              </div>
            </div>

            {/* Confirm Password with Toggle */}
            <div className="space-y-0.5">
              <label
                htmlFor="confirmpassword"
                className="text-xs font-medium text-[#8100D1] tracking-wide"
              >
                CONFIRM PASSWORD
              </label>
              <div className="relative">
                <i
                  className={`fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-[#C8AAAA] text-sm transition-colors duration-200 z-10 ${focusedField === "confirmpassword" ? "text-[#B500B2]" : ""}`}
                ></i>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmpassword"
                  name="repassword"
                  disabled={isLoading}
                  onFocus={() => setFocusedField("confirmpassword")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-9 pr-10 py-2.5 bg-[#fff5fa]/60 border-2 border-[#e4d0e4] rounded-[30px] text-sm text-gray-800 focus:border-[#B500B2] focus:bg-white focus:shadow-[0_0_0_3px_rgba(181,0,178,0.1)] outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C8AAAA] hover:text-[#B500B2] transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  tabIndex="-1"
                  disabled={isLoading}
                >
                  <i
                    className={`fas ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-sm`}
                  ></i>
                </button>
              </div>
            </div>
            {/* error message */}
            {error && (
              <div className="mt-2 mb-1 p-2.5 bg-[#FFE4E4] border border-[#FF52A0]/30 rounded-[20px] shadow-sm">
                <p className="text-[#D43B3B] text-xs text-center font-medium flex items-center justify-center gap-1">
                  <i className="fas fa-info-circle text-[#FF52A0]"></i> {error}
                </p>
              </div>
            )}

            {/* Sign Up Button with Loading Spinner */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#8100D1] to-[#B500B2] text-white font-semibold py-3 rounded-[40px] text-base shadow-[0_5px_15px_rgba(181,0,178,0.3)] border border-white/30 hover:from-[#B500B2] hover:to-[#FF52A0] hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(255,82,160,0.4)] transition-all duration-200 flex items-center justify-center gap-2 mt-5 disabled:opacity-70 disabled:cursor-not-allowed"
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus text-sm"></i> SIGN UP
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center text-center text-[#C8AAAA] text-sm my-3">
            <div className="flex-1 border-b border-[#FFA47F]"></div>
            <span className="mx-3">or register with</span>
            <div className="flex-1 border-b border-[#FFA47F]"></div>
          </div>

          {/* Social Login - With Google Loading Spinner */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading}
              className="flex-1 btn bg-gradient-to-r from-white to-gray-50 text-black border border-[#e5e5e5] hover:from-white hover:to-pink-50 hover:border-[#FF52A0] hover:shadow-[0_8px_20px_rgba(255,82,160,0.3)] rounded-full px-6 py-3 normal-case font-medium text-base transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] min-h-0 h-auto flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isGoogleLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-[#8100D1]"
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
                    width="20"
                    height="20"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
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
                  Google
                </>
              )}
            </button>

            <button className="flex-1 btn bg-gradient-to-r from-[#1877F2] to-[#0e5fd7] text-white border border-[#1877F2] hover:from-[#FF52A0] hover:to-[#B500B2] hover:border-[#FF52A0] hover:shadow-[0_8px_20px_rgba(255,82,160,0.4)] rounded-full px-6 py-3 normal-case font-medium text-base transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] min-h-0 h-auto flex items-center justify-center gap-2">
              <svg
                aria-label="Facebook logo"
                width="20"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
              >
                <path
                  fill="white"
                  d="M8 12h5V8c0-6 4-7 11-6v5c-4 0-5 0-5 3v2h5l-1 6h-4v12h-6V18H8z"
                ></path>
              </svg>
              Facebook
            </button>

            <button className="flex-1 btn bg-gradient-to-r from-black to-gray-800 text-white border border-black hover:from-[#FF52A0] hover:to-[#B500B2] hover:border-[#FF52A0] hover:shadow-[0_8px_20px_rgba(255,82,160,0.4)] rounded-full px-6 py-3 normal-case font-medium text-base transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] min-h-0 h-auto flex items-center justify-center gap-2">
              <svg
                aria-label="X logo"
                width="20"
                height="20"
                viewBox="0 0 300 271"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z" />
              </svg>
              X
            </button>
          </div>

          {/* Login Prompt */}
          <div className="mt-4 text-center text-[#6b4e6b] text-base">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#B500B2] font-semibold no-underline border-b border-[#FFA47F] hover:text-[#8100D1] hover:border-[#FF52A0] transition-all duration-200"
            >
              Sign in
            </Link>
          </div>
        </div>

        {/* Right side - Image with effects */}
        <div className="flex-1 relative bg-gradient-to-br from-[#FFA47F]/20 to-[#C8AAAA]/20 overflow-hidden min-h-[450px] lg:min-h-[550px]">
          <img
            src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1887&q=80"
            alt="beauty model"
            className="w-full h-full object-cover object-center"
          />
          {/* Glitter Overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-soft-light animate-glitter"
            style={{
              background:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.7) 0%, transparent 20%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.5) 0%, transparent 25%), repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 8px)",
            }}
          ></div>
          {/* Quote on image */}
          <div className="absolute bottom-6 left-6 text-white font-['Playfair_Display'] text-base lg:text-lg drop-shadow-lg bg-[#8100D1]/20 backdrop-blur-sm px-4 py-2 rounded-[40px] border border-white/40 flex items-center gap-1.5">
            <i className="fas fa-sparkles text-[#FFA47F] text-sm"></i> radiance
            awaits
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;