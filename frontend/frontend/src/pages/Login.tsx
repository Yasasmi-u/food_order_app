import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../api/auth';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setError('');
      if (isLogin) {
        const res = await login(username, password);
        const { token, id, role } = res.data;
        authLogin(token, id, role, username);
        navigate('/');
      } else {
        await signup(username, password, 'CUSTOMER');
        setIsLogin(true);
        setError('Account created! Please login.');
      }
    } catch (e: any) {
      setError(e.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-50">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-[120px] opacity-10 animate-pulse delay-700"></div>

      <div className="glass-panel rounded-[3rem] p-12 w-full max-w-md relative z-10 border border-slate-200 shadow-2xl">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400 tracking-tighter italic pb-2">foodie</h1>
          <p className="text-slate-500 mt-3 text-sm font-black uppercase tracking-[0.3em]">Premium Ordering</p>
        </div>

        <div className="flex bg-slate-100 rounded-2xl p-1.5 mb-8 border border-slate-200 shadow-inner">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${isLogin ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Entry
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${!isLogin ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-500 hover:text-slate-900'}`}
          >
            Join
          </button>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">Identity</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-slate-900 placeholder-slate-300 transition-all"
            />
          </div>
          <div className="relative group">
            <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">Keyphrase</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full mt-2 px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-slate-900 placeholder-slate-300 transition-all"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-[10px] font-black uppercase tracking-widest p-4 rounded-2xl animate-bounce-in">
               ⚠️ {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="w-full bg-slate-900 text-white hover:bg-amber-600 font-black py-5 rounded-[1.5rem] shadow-xl hover:-translate-y-1 transition-all duration-500 text-sm uppercase tracking-[0.2em]"
          >
            {isLogin ? 'Authorize Entry' : 'Create Profile'}
          </button>

          <p className="text-[9px] text-slate-400 text-center uppercase tracking-widest font-black opacity-60 mt-4">
             Secured by AES-256 Encryption
          </p>
        </div>
      </div>
    </div>
  );
}