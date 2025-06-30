import React, { useState } from "react";
import { login, signup } from "../firebase";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (formState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0a0f1c] px-4 text-white font-sans relative">
      
      {/* CryptoCorner Heading */}
      <div className="absolute top-8 w-full text-center text-5xl font-extrabold text-white tracking-wider drop-shadow-[0_2px_8px_rgba(255,255,255,0.1)]">
        Crypto<span className="text-blue-400">Corner</span>
      </div>

      {loading ? (
        <div className="w-16 h-16 border-[6px] border-gray-300 border-t-teal-400 rounded-full animate-spin"></div>
      ) : (
        <div className="w-full max-w-md mt-24 backdrop-blur-2xl border border-blue-500/20 bg-[#1e293b]/70 rounded-3xl shadow-[0_0_30px_#3b82f680] p-10 relative overflow-hidden group transition-all duration-500 ease-in-out hover:scale-[1.02]">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-400 rounded-t-3xl animate-pulse"></div>

          <h1 className="text-4xl font-bold text-center text-cyan-300 mb-10 tracking-tight">
            {formState}
          </h1>

          <form onSubmit={user_auth} className="space-y-6">
            {formState === "Sign Up" && (
              <div>
                <label className="block mb-1 text-sm font-medium text-cyan-200">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-cyan-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
                />
              </div>
            )}
            <div>
              <label className="block mb-1 text-sm font-medium text-cyan-200">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-cyan-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium text-cyan-200">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-cyan-600/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full cursor-pointer py-3 bg-gradient-to-tr from-cyan-400 to-blue-500 text-black font-bold text-lg tracking-wide rounded-lg shadow-lg hover:shadow-cyan-400/30 transition-all transform hover:scale-[1.03]"
            >
              {formState}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-gray-300">
            {formState === "Sign In" ? (
              <p>
                New to CryptoPlace?{" "}
                <span
                  onClick={() => setFormState("Sign Up")}
                  className="text-cyan-400 font-semibold cursor-pointer hover:underline"
                >
                  Sign up now
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => setFormState("Sign In")}
                  className="text-cyan-400 font-semibold cursor-pointer hover:underline"
                >
                  Sign in now
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
