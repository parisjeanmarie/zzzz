import { Clock, Lock, Coins } from 'lucide-react';
import { Meditation } from '../types';

interface MeditationCardProps {
  meditation: Meditation;
  onClick: () => void;
}

export function MeditationCard({ meditation, onClick }: MeditationCardProps) {
  const isLocked = !meditation.isUnlocked && meditation.coinCost;
  
  return (
    <div
      className={`bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ${
        isLocked ? 'cursor-default opacity-75' : 'cursor-pointer hover:scale-105'
      }`}
      onClick={onClick}
      data-testid={`meditation-card-${meditation.id}`}
    >
      <div
        className="meditation-bg h-48 relative"
        style={{ backgroundImage: `url(${meditation.backgroundImage})` }}
      >
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="text-center text-white">
              <Lock className="w-12 h-12 mx-auto mb-2" />
              <div className="flex items-center justify-center gap-1">
                <Coins className="w-4 h-4" />
                <span className="text-sm">{meditation.coinCost}</span>
              </div>
            </div>
          </div>
        )}
        <div className="p-6 h-full flex flex-col justify-end bg-gradient-to-t from-black/60 via-black/20 to-transparent">
          <h3 className="text-white text-xl font-semibold mb-2">{meditation.title}</h3>
          <div className="flex items-center gap-2 text-white/90">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{meditation.duration} min</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-white/80 text-sm mb-2">{meditation.description}</p>
        <div className="flex gap-1 flex-wrap">
          {meditation.categories.map((category) => (
            <span
              key={category}
              className="px-2 py-1 bg-white/20 text-white text-xs rounded capitalize"
            >
              {category === 'adhd' ? 'ADHD' : category === 'ptsd' ? 'PTSD' : category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
