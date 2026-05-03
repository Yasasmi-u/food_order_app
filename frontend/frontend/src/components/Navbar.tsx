import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { getCart } from '../api/cart';

export default function Navbar() {
  const { logout, username, role, userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (userId) {
      getCart(userId).then(r => {
        setCartCount(r.data?.cartItems?.length || 0);
      });
    }
    setIsMobileMenuOpen(false); // Close menu on route change
  }, [userId, location]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Home', path: '/', roles: ['ADMIN', 'CUSTOMER'] },
    { label: 'Shop Menu', path: '/menu', roles: ['ADMIN', 'CUSTOMER'] },
    { label: 'My Orders', path: '/orders', roles: ['CUSTOMER'] },
    { label: 'Inventory', path: '/products', roles: ['ADMIN'] },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(role || ''));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-slate-100 shadow-sm transition-all duration-500">
      <div className="w-full px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-2 group min-w-[120px]">
          <h1 className={`text-xl md:text-2xl font-black text-transparent bg-clip-text tracking-tighter drop-shadow-sm italic py-1 px-1 ${role === 'ADMIN' ? 'bg-gradient-to-r from-amber-600 to-amber-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}>
            foodie
          </h1>
        </NavLink>

        {/* Desktop Center Links */}
        <div className="hidden lg:flex items-center gap-2 bg-slate-50/50 p-1.5 rounded-2xl border border-slate-100 shadow-inner">
          {filteredItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500
                ${isActive ? 'bg-slate-900 text-white shadow-xl scale-105' : 'text-slate-400 hover:text-slate-900 hover:bg-white'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-6 justify-end">
          {role === 'CUSTOMER' && (
            <NavLink to="/cart" className="relative group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white flex items-center justify-center text-lg md:text-xl border border-slate-100 shadow-sm transition-all duration-300 group-hover:bg-amber-500 group-hover:text-white">
                🛒
              </div>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xl animate-bounce-in">
                  {cartCount}
                </span>
              )}
            </NavLink>
          )}

          <div className="hidden sm:block h-8 w-px bg-slate-200 mx-1"></div>

          {/* User Profile - Hidden on tiny screens, icon only on small */}
          <div className="hidden sm:flex items-center gap-3 bg-white pl-4 pr-1.5 py-1.5 rounded-2xl border border-slate-100 shadow-sm group">
            <div className="text-right hidden md:block">
              <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{username}</p>
              <p className="text-[8px] font-black text-amber-600 uppercase tracking-[0.3em]">{role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-all duration-500"
              title="Logout"
            >
              🚪
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg active:scale-95 transition-all"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-2xl animate-fade-in-down p-6 flex flex-col gap-3">
          {filteredItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all
                ${isActive ? 'bg-amber-500 text-white' : 'bg-slate-50 text-slate-500'}`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="h-px bg-slate-100 my-2"></div>
          <div className="flex items-center justify-between p-4 bg-slate-900 rounded-2xl text-white">
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest">{username}</p>
                <p className="text-[8px] text-amber-400 font-black uppercase tracking-widest">{role}</p>
             </div>
             <button onClick={handleLogout} className="bg-red-500/20 text-red-400 p-2 rounded-xl text-xl">🚪</button>
          </div>
        </div>
      )}
    </nav>
  );
}
