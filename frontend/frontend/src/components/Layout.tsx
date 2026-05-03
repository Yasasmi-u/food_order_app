import Navbar from './Navbar';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 pt-28 pb-20">
        {children}
      </main>

      {/* Modern E-commerce Footer */}
      <footer className="border-t border-slate-100 py-12 px-6 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic mb-4">foodie</h2>
            <p className="text-slate-500 max-w-xs text-sm leading-relaxed">
              Elevating your culinary experience with premium ingredients and lightning-fast delivery. Your favorite meals, curated with passion.
            </p>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-6">Quick Links</h3>
            <div className="flex flex-col gap-4 text-sm text-slate-500">
              <a href="/menu" className="hover:text-amber-600 transition-colors">Our Menu</a>
              <a href="/orders" className="hover:text-amber-600 transition-colors">Track Order</a>
              <a href="/cart" className="hover:text-amber-600 transition-colors">Shopping Cart</a>
            </div>
          </div>
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-900 mb-6">Connect</h3>
            <div className="flex flex-col gap-4 text-sm text-slate-500">
              <span className="hover:text-amber-600 transition-colors cursor-pointer">Instagram</span>
              <span className="hover:text-amber-600 transition-colors cursor-pointer">Twitter</span>
              <span className="hover:text-amber-600 transition-colors cursor-pointer">Support</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">© 2026 FOODIE PREMIUM SERVICES</p>
          <div className="flex gap-8">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-900 transition-colors">Privacy</span>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-900 transition-colors">Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
}