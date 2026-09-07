import React from 'react';
import { ShoppingBag, Search, Sparkles } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  cartCount: number;
  onOpenCartMobile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  cartCount,
  onOpenCartMobile,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-900 text-amber-100 flex items-center justify-center font-serif text-xl font-bold shadow-inner">
            V&amp;V
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-amber-950 tracking-tight flex items-center gap-2">
              Velvet &amp; Vanilla
              <Sparkles className="w-4 h-4 text-amber-600 hidden sm:inline" />
            </h1>
            <p className="text-xs text-amber-800/70 font-medium hidden sm:block">Artisan Bakery &amp; Patisserie</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search our fresh baked treats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
          />
        </div>

        {/* Mobile Quick Cart Button */}
        <button
          type="button"
          onClick={onOpenCartMobile}
          className="lg:hidden relative p-2.5 bg-rose-50 hover:bg-rose-100 text-rose-900 rounded-full transition-colors flex items-center gap-2"
          aria-label="View shopping cart"
        >
          <ShoppingBag className="w-5 h-5 text-rose-700" />
          {cartCount > 0 && (
            <span className="bg-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search treats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
          />
        </div>
      </div>
    </header>
  );
};