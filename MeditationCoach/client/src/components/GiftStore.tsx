import { Lock, Unlock, Coins } from 'lucide-react';
import { Gift } from '../types';

interface GiftStoreProps {
  gifts: Gift[];
  userCoins: number;
  onUnlockGift: (giftId: string) => void;
}

export function GiftStore({ gifts, userCoins, onUnlockGift }: GiftStoreProps) {
  const handleGiftClick = (gift: Gift) => {
    if (!gift.isUnlocked && userCoins >= gift.coinCost) {
      onUnlockGift(gift.id);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {gifts.map((gift) => {
        const canUnlock = !gift.isUnlocked && userCoins >= gift.coinCost;
        
        return (
          <div
            key={gift.id}
            data-testid={`gift-${gift.id}`}
            className={`
              bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg overflow-hidden transition-transform duration-300
              ${canUnlock ? 'cursor-pointer hover:scale-105' : ''}
              ${gift.isUnlocked ? 'gift-unlock' : ''}
            `}
            onClick={() => handleGiftClick(gift)}
          >
            <div className={`h-32 bg-gradient-to-br ${gift.gradientColors} flex items-center justify-center relative`}>
              <i className={`${gift.iconClass} text-4xl ${gift.isUnlocked ? 'opacity-100' : 'opacity-50'}`} />
              
              {!gift.isUnlocked && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Lock className="text-white w-8 h-8" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-white mb-1">{gift.title}</h3>
              <p className="text-xs text-white/70 mb-2">{gift.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Coins className="w-4 h-4 text-accent" />
                  <span className="text-sm text-white">{gift.coinCost}</span>
                </div>
                
                <div className={`flex items-center ${gift.isUnlocked ? 'text-green-400' : 'text-white/60'}`}>
                  {gift.isUnlocked ? (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span className="text-xs ml-1">Unlocked</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span className="text-xs ml-1">
                        {userCoins >= gift.coinCost ? 'Click to unlock' : 'Locked'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
