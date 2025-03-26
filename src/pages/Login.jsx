import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Lock, Mail, ArrowRight, User, Eye, EyeOff } from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const createSparkle = () => {
      const id = Date.now();
      const style = {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`
      };
      setSparkles(prev => [...prev, { id, style }]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(sparkle => sparkle.id !== id));
      }, 4000);
    };

    const interval = setInterval(createSparkle, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      if (email === '' || password.length < 6) {
        setError('Invalid email or password must be at least 6 characters long');
      } else {
        navigate('/dashboard');
      }
    }, 2000);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative bg-black overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1595073505922-a3196685a920?q=80&w=1525&auto=format&fit=crop')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={sparkle.style}
        />
      ))}
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between bg-white/10 p-8 rounded-2xl shadow-xl backdrop-blur-lg">
        <div className="w-full md:w-1/2 p-10 space-y-8">
          <div className="text-center space-y-6">
            <h1 className="text-6xl font-bold tracking-wider gradient-text">Perfume Sales</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="luxury-input w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-400"
                  placeholder="Your email"
                  required
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="luxury-input w-full pl-12 pr-10 py-4 rounded-xl text-white placeholder-gray-400"
                  placeholder="Your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-5 h-5 text-gray-400" /> : <Eye className="w-5 h-5 text-gray-400" />}
                </button>
              </div>
              {isSignup && (
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    className="luxury-input w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-400"
                    placeholder="Your name"
                    required
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between text-sm text-gray-300">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="rounded border-gray-300"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="hover:text-white transition"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? 'Already have an account?' : 'Create Account'}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="btn-glow w-full py-4 rounded-xl text-white font-medium tracking-wide flex items-center justify-center"
              disabled={loading}
            >
              {loading ? 'Loading...' : isSignup ? 'SIGN UP' : 'LOGIN'}
              {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src="/images/perfume3.jpg"
            alt="Luxury Perfume"
            className="rounded-xl shadow-lg w-80 h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;