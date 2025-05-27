import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = (props) => {
  const [user, setUser] = useState({ user: "", email: "", password: "" });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!user.user || !user.email || !user.password)
      alert("Enter the valid details");
    else {
      props.handleRegister(user, navigate);
      setUser({ user: "", email: "", password: "" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login to Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            required
            value={user.user}
            onChange={(e) => setUser({ ...user, user: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {props.registerError && (
            <p className="text-red-500 text-sm">{props.registerError}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
          <div>
            <p className="text-sm text-center mt-2">
              Have account ?{" "}
              <Link
                to="/"
                className="text-blue-600 hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
