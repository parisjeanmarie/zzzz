import { GiftStore } from '../components/GiftStore';
import { gifts as initialGifts } from '../data/gifts';
import { UserData, Gift } from '../types';

interface GiftStorePageProps {
  userData: UserData;
  onUpdateUserData: (data: Partial<UserData>) => void;
}

export function GiftStorePage({ userData, onUpdateUserData }: GiftStorePageProps) {
  // Update gifts based on user's unlocked gifts
  const gifts: Gift[] = initialGifts.map(gift => ({
    ...gift,
    isUnlocked: userData.unlockedGifts.includes(gift.id) || gift.isUnlocked,
  }));

  const handleUnlockGift = (giftId: string) => {
    const gift = gifts.find(g => g.id === giftId);
    if (!gift || gift.isUnlocked || userData.coins < gift.coinCost) return;

    onUpdateUserData({
      coins: userData.coins - gift.coinCost,
      unlockedGifts: [...userData.unlockedGifts, giftId],
    });
  };

  return (
    <div className="relative min-h-screen">
      {/* Nature background */}
      <div className="fixed inset-0 meditation-bg" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080)',
        filter: 'blur(3px)',
        transform: 'scale(1.05)'
      }}></div>
      <div className="fixed inset-0 bg-background/85 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-20 lg:pt-24 pb-20 lg:pb-8">
        <div className="container mx-auto px-4">
          {/* Gift Store */}
          <GiftStore
            gifts={gifts}
            userCoins={userData.coins}
            onUnlockGift={handleUnlockGift}
          />
        </div>
      </div>
    </div>
  );
}
