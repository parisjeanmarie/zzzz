export interface Meditation {
  id: string;
  title: string;
  duration: number; // in minutes
  backgroundImage: string;
  description: string;
  categories: string[];
  voiceUrl?: string;
  backgroundSoundUrl?: string;
  coinCost?: number; // Cost to unlock premium meditations
  isUnlocked: boolean;
}

export interface Gift {
  id: string;
  title: string;
  description: string;
  coinCost: number;
  iconClass: string;
  gradientColors: string;
  isUnlocked: boolean;
}

export interface UserData {
  coins: number;
  unlockedGifts: string[];
  unlockedMeditations: string[];
}

export type Category = 'all' | 'sleep' | 'focus' | 'stress' | 'adhd' | 'anxiety' | 'ptsd';
