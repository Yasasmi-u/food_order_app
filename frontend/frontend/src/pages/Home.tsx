import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { username, role } = useAuth();

  const features = [
    { title: 'Fast Delivery', desc: 'Under 30 mins', icon: '🚀' },
    { title: 'Premium Taste', desc: 'Chef curated', icon: '👨‍🍳' },
    { title: 'Secure Pay', desc: '100% Protected', icon: '🛡️' },
  ];

  return (
    <div className="space-y-16 md:space-y-24 animate-fade-in">
      {/* Hero Section - Fully Responsive */}
      <section className="relative h-[450px] md:h-[600px] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden group shadow-2xl border border-white/10">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[5s] group-hover:scale-105"
          alt="Hero"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent flex items-center px-8 md:px-24">
          <div className="max-w-xl text-white">
            <p className="font-black uppercase tracking-[0.5em] text-[8px] md:text-[10px] mb-4 md:mb-6 text-amber-400 drop-shadow-lg">Premium Food Experience</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tighter mb-6 md:mb-8 drop-shadow-2xl">
              Savor the<br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 py-1 pr-6">Exquisite</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-lg font-medium max-w-sm mb-8 md:mb-12 leading-relaxed drop-shadow-md hidden sm:block">
              Welcome back, <span className="text-white font-black">{username}</span>. Explore our new seasonal menu crafted with fresh, locally sourced ingredients.
            </p>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <NavLink 
                to="/menu" 
                className="bg-white text-black hover:bg-amber-500 hover:text-white px-8 md:px-12 py-3.5 md:py-4 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-500 shadow-2xl"
              >
                Start Ordering
              </NavLink>
              <button className="border-2 border-white/20 backdrop-blur-md text-white hover:bg-white hover:text-black px-8 md:px-12 py-3.5 md:py-4 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all duration-500 hidden sm:block">
                Learn More
              </button>
            </div>
          </div>
        </div>
        
        {/* Floating Accent - Hidden on small mobile */}
        <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 hidden sm:flex items-center gap-4 md:gap-6 glass-panel p-4 md:p-6 rounded-2xl md:rounded-3xl border-slate-200 animate-bounce-slow bg-white/70 shadow-2xl scale-75 md:scale-100">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-amber-500 flex items-center justify-center text-xl md:text-2xl shadow-lg">🍕</div>
          <div className="text-left">
            <p className="text-slate-900 font-black text-sm md:text-base">Daily Special</p>
            <p className="text-slate-500 text-[8px] md:text-[9px] font-black uppercase tracking-widest">20% Off Today</p>
          </div>
        </div>
      </section>

      {/* Features Grid - Stacks on Mobile */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
        {features.map((f, i) => (
          <div key={i} className="glass-panel p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border-slate-100 hover:border-amber-200 transition-all duration-500 group bg-white/70">
            <div className="text-4xl md:text-5xl mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">{f.icon}</div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 tracking-tight">{f.title}</h3>
            <p className="text-slate-500 text-sm md:text-base font-medium">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Categories - Grid Adjusts */}
      <section>
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">Browse Categories</h2>
          <NavLink to="/menu" className="text-amber-600 font-black text-[10px] md:text-xs uppercase tracking-widest hover:underline underline-offset-8">Explore All →</NavLink>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {['Burgers', 'Pizzas', 'Beverages', 'Desserts'].map((cat, i) => (
            <div key={i} className="relative h-48 md:h-64 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group cursor-pointer shadow-xl">
              <img 
                src={`https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80&sig=${i}`} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                alt={cat}
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-amber-600/60 transition-all duration-500 flex items-center justify-center">
                <p className="text-white font-black text-lg md:text-xl tracking-widest uppercase">{cat}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Responsive Padding/Text */}
      <section className="bg-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-amber-500/10 rounded-full filter blur-[100px]"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white mb-6 md:mb-8 tracking-tighter leading-tight">
            Ready to taste the<br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300 py-1 pr-10">Extraordinary?</span>
          </h2>
          <NavLink 
            to="/menu" 
            className="inline-block bg-amber-500 text-white font-black px-10 md:px-16 py-4 md:py-6 rounded-xl md:rounded-2xl hover:bg-white hover:text-black transition-all duration-500 shadow-2xl text-[10px] md:text-sm uppercase tracking-widest"
          >
            Explore Full Menu
          </NavLink>
        </div>
      </section>
    </div>
  );
}