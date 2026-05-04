import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { logout, username, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'HOME', path: '/', icon: '🏠', roles: ['ADMIN', 'CUSTOMER'] },
    { label: 'MENU', path: '/menu', icon: '🍽️', roles: ['ADMIN', 'CUSTOMER'] },
    { label: 'CART', path: '/cart', icon: '🛒', roles: ['CUSTOMER'] },
    { label: 'ORDERS', path: '/orders', icon: '🕐', roles: ['CUSTOMER'] },
    { label: 'INVENTORY', path: '/products', icon: '📦', roles: ['ADMIN'] },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(role || ''));

  return (
    <div className={`w-64 min-h-screen glass-panel flex flex-col py-8 px-5 border-r z-10 transition-all duration-500 ${role === 'ADMIN' ? 'border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.05)]' : 'border-slate-200'}`}>
      <div className="mb-12 px-2 flex flex-col items-center">
        <h1 className={`text-4xl font-black text-transparent bg-clip-text tracking-tighter drop-shadow-md italic py-1 ${role === 'ADMIN' ? 'bg-gradient-to-r from-amber-400 to-yellow-300' : 'bg-gradient-to-r from-amber-400 to-orange-400'}`}>
          foodie
        </h1>
        <div className={`mt-4 px-4 py-1.5 rounded-full bg-slate-50 border text-[10px] font-black uppercase tracking-widest shadow-inner flex items-center gap-2 ${role === 'ADMIN' ? 'border-amber-500/40 text-amber-600' : 'border-slate-200 text-slate-500'}`}>
          <div className={`w-2 h-2 rounded-full animate-pulse ${role === 'ADMIN' ? 'bg-amber-500' : 'bg-green-500'}`}></div>
          {username} · <span className={role === 'ADMIN' ? 'text-amber-600' : 'text-amber-600'}>{role}</span>
        </div>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {filteredItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300
              ${isActive 
                ? (role === 'ADMIN' 
                    ? 'bg-gradient-to-r from-amber-600 to-yellow-500 text-white shadow-[0_0_20px_rgba(217,119,6,0.4)] scale-[1.02]' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-400 text-white shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-[1.02]')
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 hover:scale-[1.02]'}`
            }
          >
            <span className="text-xl drop-shadow-sm opacity-90">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 px-4 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20 transition-all duration-300"
      >
        <span className="text-lg">🚪</span> LOGOUT
      </button>
    </div>
  );
}