import { Leaf, ShoppingBag, Gift, Coins } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentPage: string;
  coins: number;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, coins, onPageChange }: NavigationProps) {
  const navItems = [
    { id: 'meditation', label: 'Meditate', icon: Leaf },
    { id: 'coins', label: 'Coins', icon: ShoppingBag },
    { id: 'gifts', label: 'Gifts', icon: Gift },
  ];

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center justify-center gap-8 p-4">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              data-testid={`nav-${id}`}
              onClick={() => onPageChange(id)}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm",
                currentPage === id
                  ? "bg-white/25 text-white border border-white/40"
                  : "text-white/80 hover:bg-white/15 hover:text-white"
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
          
          {/* Desktop Coin Counter */}
          <div className="flex items-center gap-4 ml-8">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-2">
              <Coins className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-white" data-testid="desktop-coin-count">{coins}</span>
              <span className="text-xs text-white/70">coins</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-sm border-t border-white/20">
        <div className="flex items-center justify-around p-4">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              data-testid={`nav-${id}-mobile`}
              onClick={() => onPageChange(id)}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm",
                currentPage === id
                  ? "bg-white/25 text-white border border-white/40"
                  : "text-white/80 hover:bg-white/15"
              )}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Coin Counter - Top Right */}
      <div className="lg:hidden fixed top-4 right-4 z-30">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-white/30 rounded-full px-3 py-2 shadow-lg">
          <Coins className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-white" data-testid="mobile-coin-count">{coins}</span>
        </div>
      </div>
    </>
  );
}
