import { useState } from 'react';
import { meditations } from '../data/meditations';
import { MeditationCard } from '../components/MeditationCard';
import { MeditationOverlay } from '../components/MeditationOverlay';
import { Meditation, Category, UserData } from '../types';
import { cn } from '@/lib/utils';

interface MeditationLibraryProps {
  userData: UserData;
  onUpdateUserData: (data: Partial<UserData>) => void;
}

export function MeditationLibrary({ userData, onUpdateUserData }: MeditationLibraryProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedMeditation, setSelectedMeditation] = useState<Meditation | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const categories: { value: Category; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'focus', label: 'Focus' },
    { value: 'stress', label: 'Stress Relief' },
    { value: 'adhd', label: 'ADHD' },
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'ptsd', label: 'PTSD' },
  ];

  // Update meditations with unlock status based on user data
  const updatedMeditations = meditations.map(meditation => ({
    ...meditation,
    isUnlocked: meditation.isUnlocked || userData.unlockedMeditations.includes(meditation.id)
  }));

  const filteredMeditations = updatedMeditations.filter(meditation => 
    selectedCategory === 'all' || meditation.categories.includes(selectedCategory)
  );

  const handleMeditationClick = (meditation: Meditation) => {
    // Only allow access if meditation is unlocked
    if (meditation.isUnlocked) {
      setSelectedMeditation(meditation);
      setIsOverlayOpen(true);
    }
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedMeditation(null);
  };

  return (
    <div className="relative min-h-screen">
      {/* Blurred nature background */}
      <div className="fixed inset-0 nature-blur-bg"></div>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm"></div>
      
      {/* Content */}
      <div className="relative z-10 pt-20 lg:pt-24 pb-20 lg:pb-8">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(({ value, label }) => (
              <button
                key={value}
                data-testid={`category-${value}`}
                onClick={() => setSelectedCategory(value)}
                className={cn(
                  "px-4 py-2 rounded-full border transition-all duration-200 text-sm font-medium backdrop-blur-sm",
                  selectedCategory === value
                    ? "bg-white/25 text-white border-white/40 shadow-lg"
                    : "bg-white/10 text-white/90 border-white/30 hover:bg-white/20 hover:border-white/50"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Meditation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeditations.map((meditation) => (
              <MeditationCard
                key={meditation.id}
                meditation={meditation}
                onClick={() => handleMeditationClick(meditation)}
              />
            ))}
          </div>

          {filteredMeditations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No meditations found for the selected category.
              </p>
            </div>
          )}
        </div>
      </div>

      <MeditationOverlay
        meditation={selectedMeditation}
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </div>
  );
}
