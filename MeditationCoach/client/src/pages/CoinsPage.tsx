import { useState } from 'react';
import { Coins, ShoppingBag, Lock, Unlock, Star } from 'lucide-react';
import { UserData } from '../types';
import { meditations } from '../data/meditations';

interface CoinsPageProps {
  userData: UserData;
  onUpdateUserData: (data: Partial<UserData>) => void;
}

export function CoinsPage({ userData, onUpdateUserData }: CoinsPageProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const coinPackages = [
    { id: 'starter', coins: 100, price: '$0.99', popular: false },
    { id: 'basic', coins: 250, price: '$1.99', popular: false },
    { id: 'premium', coins: 500, price: '$3.99', popular: true },
    { id: 'deluxe', coins: 1000, price: '$6.99', popular: false },
    { id: 'ultimate', coins: 2500, price: '$14.99', popular: false },
  ];

  const handlePurchase = (packageId: string) => {
    const selectedPkg = coinPackages.find(pkg => pkg.id === packageId);
    if (selectedPkg) {
      // Placeholder for purchase logic - in real app would integrate with payment processor
      onUpdateUserData({
        coins: userData.coins + selectedPkg.coins,
      });
      setSelectedPackage(null);
      alert(`Successfully purchased ${selectedPkg.coins} coins!`);
    }
  };

  const handleUnlockMeditation = (meditationId: string, coinCost: number) => {
    if (userData.coins >= coinCost) {
      onUpdateUserData({
        coins: userData.coins - coinCost,
        unlockedMeditations: [...userData.unlockedMeditations, meditationId],
      });
    }
  };

  const lockedMeditations = meditations.filter(m => 
    m.coinCost && !m.isUnlocked && !userData.unlockedMeditations.includes(m.id)
  );

  return (
    <div className="pt-20 lg:pt-24 pb-20 lg:pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Coin Shop</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Unlock premium meditations and enhance your mindfulness journey
          </p>
          
          {/* Current Balance */}
          <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 shadow-lg">
            <Coins className="w-6 h-6 text-accent" />
            <div className="text-left">
              <div className="text-2xl font-bold text-white" data-testid="current-coins">{userData.coins}</div>
              <div className="text-sm text-white/70">Available Coins</div>
            </div>
          </div>
        </div>

        {/* Coin Packages */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">Buy More Coins</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {coinPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`
                  relative bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6 text-center transition-transform duration-200
                  ${selectedPackage === pkg.id ? 'ring-2 ring-white/50 scale-105' : 'hover:scale-105'}
                  ${pkg.popular ? 'border-2 border-accent' : 'border border-white/30'}
                `}
                data-testid={`coin-package-${pkg.id}`}
              >
                {pkg.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="mb-4">
                  <Coins className="w-12 h-12 text-accent mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{pkg.coins}</div>
                  <div className="text-sm text-white/70">Coins</div>
                </div>
                
                <div className="text-xl font-semibold text-white mb-4">{pkg.price}</div>
                
                <button
                  onClick={() => handlePurchase(pkg.id)}
                  className="w-full btn-transparent py-2 px-4 rounded-lg font-medium"
                  data-testid={`buy-${pkg.id}`}
                >
                  Purchase
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Meditations */}
        {lockedMeditations.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Unlock Premium Meditations</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {lockedMeditations.map((meditation) => {
                const canUnlock = userData.coins >= (meditation.coinCost || 0);
                
                return (
                  <div
                    key={meditation.id}
                    className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg overflow-hidden"
                    data-testid={`locked-meditation-${meditation.id}`}
                  >
                    <div
                      className="meditation-bg h-48 relative"
                      style={{ backgroundImage: `url(${meditation.backgroundImage})` }}
                    >
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Lock className="text-white w-12 h-12" />
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-black/60 rounded-full px-3 py-1 flex items-center gap-2">
                          <Coins className="w-4 h-4 text-accent" />
                          <span className="text-white text-sm">{meditation.coinCost}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-lg text-white mb-2">{meditation.title}</h3>
                      <p className="text-white/70 text-sm mb-4">{meditation.description}</p>
                      
                      <div className="flex gap-2 mb-4">
                        {meditation.categories.map((category) => (
                          <span
                            key={category}
                            className="px-2 py-1 bg-white/20 text-white text-xs rounded capitalize"
                          >
                            {category === 'adhd' ? 'ADHD' : category === 'ptsd' ? 'PTSD' : category}
                          </span>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => handleUnlockMeditation(meditation.id, meditation.coinCost || 0)}
                        disabled={!canUnlock}
                        className={`
                          w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 backdrop-blur-sm
                          ${canUnlock 
                            ? 'btn-transparent' 
                            : 'bg-black/30 border border-white/20 text-white/50 cursor-not-allowed'
                          }
                        `}
                        data-testid={`unlock-meditation-${meditation.id}`}
                      >
                        {canUnlock ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        {canUnlock ? 'Unlock Meditation' : 'Not Enough Coins'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        {lockedMeditations.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">All Meditations Unlocked!</h3>
            <p className="text-muted-foreground">
              You have access to all premium meditations. Check out the meditation enhancements in the Gifts section!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}