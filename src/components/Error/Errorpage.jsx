import React from "react";
import { Link, useNavigate } from "react-router";

const Errorpage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-[5%] bg-gradient-to-br from-[#fdfaff] via-[#faf5fa] to-[#fdfaff] bg-[radial-gradient(circle_at_10%_30%,rgba(255,82,160,0.03)_0%,transparent_30%),radial-gradient(circle_at_90%_70%,rgba(129,0,209,0.03)_0%,transparent_40%)]">
      <div className="max-w-4xl w-full bg-white/75 backdrop-blur-md rounded-[48px_24px_48px_24px] shadow-[0_30px_50px_-20px_rgba(129,0,209,0.25),0_0_0_1px_rgba(200,170,170,0.2)] border border-white/50 overflow-hidden p-8 md:p-12">
        <div className="text-center">
          <div className="relative inline-block mb-6">
            <h1 className="font-['Playfair_Display'] text-8xl md:text-9xl font-bold bg-gradient-to-r from-[#8100D1] via-[#B500B2] to-[#FF52A0] bg-clip-text text-transparent">
              404
            </h1>
            <div className="absolute -top-4 -right-8 text-[#FFA47F] animate-pulse">
              <i className="fas fa-sparkles text-3xl"></i>
            </div>
            <div className="absolute -bottom-2 -left-8 text-[#FF52A0] animate-pulse delay-300">
              <i className="fas fa-sparkles text-2xl"></i>
            </div>
          </div>

          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-[#8100D1] mb-4">
            PAGE NOT FOUND
          </h2>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-[#FFA47F]"></div>
            <i className="fas fa-heart text-[#FF52A0] text-lg"></i>
            <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-[#FFA47F]"></div>
          </div>

          <div className="max-w-2xl mx-auto mb-10">
            <p className="text-[#6b4e6b] font-['Montserrat'] text-base md:text-lg leading-relaxed">
              Something seems to have gone wrong! The page you're requesting
              doesn't exist. It may have been{" "}
              <span className="text-[#B500B2] font-medium">obsolete</span>,
              <span className="text-[#FF52A0] font-medium"> deleted</span>, or
              you may have entered an invalid address in the address bar.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/"
              className="group bg-gradient-to-r from-[#8100D1] to-[#B500B2] text-white font-semibold py-3.5 px-8 rounded-[50px] text-base shadow-[0_8px_20px_rgba(181,0,178,0.3)] border border-white/30 hover:from-[#B500B2] hover:to-[#FF52A0] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,82,160,0.4)] transition-all duration-200 flex items-center justify-center gap-2 min-w-[200px]"
            >
              <i className="fas fa-home group-hover:animate-bounce"></i>
              <span>GO TO HOME</span>
            </Link>

            <button
              onClick={goBack}
              className="group bg-gradient-to-r from-[#C8AAAA] to-[#b99e9e] text-white font-semibold py-3.5 px-8 rounded-[50px] text-base shadow-[0_8px_20px_rgba(200,170,170,0.3)] border border-white/30 hover:from-[#FFA47F] hover:to-[#FF52A0] hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,82,160,0.4)] transition-all duration-200 flex items-center justify-center gap-2 min-w-[200px]"
            >
              <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform duration-200"></i>
              <span>PREVIOUS PAGE</span>
            </button>
          </div>

          <div className="mt-12 flex justify-center gap-6 text-[#C8AAAA]">
            <i className="fas fa-circle text-xs"></i>
            <i className="fas fa-circle text-sm text-[#FFA47F]"></i>
            <i className="fas fa-circle text-xs"></i>
            <i className="fas fa-circle text-sm text-[#FF52A0]"></i>
            <i className="fas fa-circle text-xs"></i>
            <i className="fas fa-circle text-sm text-[#B500B2]"></i>
            <i className="fas fa-circle text-xs"></i>
          </div>
        </div>
      </div>

      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.7) 0%, transparent 20%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.5) 0%, transparent 25%),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 2px, transparent 2px, transparent 8px)
          `,
        }}
      ></div>

      <style jsx>{`
        @keyframes glitterMove {
          0% {
            opacity: 0.4;
            background-position: 0% 0%;
          }
          50% {
            opacity: 0.7;
            background-position: 50% 50%;
          }
          100% {
            opacity: 0.5;
            background-position: 100% 100%;
          }
        }
        .animate-glitter {
          animation: glitterMove 8s infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default Errorpage;
