import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { label: 'HOME', path: '/', icon: '🏠' },
  { label: 'MENU', path: '/menu', icon: '🍽️' },
  { label: 'CART', path: '/cart', icon: '🛒' },
  { label: 'ORDER HISTORY', path: '/orders', icon: '🕐' },
  { label: 'PRODUCTS', path: '/products', icon: '📦' },
];

export default function Sidebar() {
  const { logout, username, role } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-56 min-h-screen bg-white shadow-md flex flex-col py-8 px-4">
      <div className="mb-10 px-2">
        <h1 className="text-3xl font-bold text-orange-500">food</h1>
        <p className="text-xs text-gray-400 mt-1">{username} · {role}</p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition
              ${isActive ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-orange-50 hover:text-orange-500'}`
            }
          >
            <span>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-400 hover:text-red-500 transition"
      >
        <span>🚪</span> LOGOUT
      </button>
    </div>
  );
}