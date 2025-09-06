import { useState } from 'react';
import { Navigation } from './components/Navigation';
import { MeditationLibrary } from './pages/MeditationLibrary';
import { CoinsPage } from './pages/CoinsPage';
import { GiftStorePage } from './pages/GiftStorePage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { UserData } from './types';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';

const initialUserData: UserData = {
  coins: 150,
  unlockedGifts: ['butterfly-collection', 'zen-garden'],
  unlockedMeditations: [],
};

function App() {
  const [currentPage, setCurrentPage] = useState('meditation');
  const [userData, setUserData] = useLocalStorage<UserData>('mindful-user-data', initialUserData);

  const handleUpdateUserData = (updates: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...updates }));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'meditation':
        return <MeditationLibrary userData={userData} onUpdateUserData={handleUpdateUserData} />;
      case 'coins':
        return (
          <CoinsPage
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
          />
        );
      case 'gifts':
        return (
          <GiftStorePage
            userData={userData}
            onUpdateUserData={handleUpdateUserData}
          />
        );
      default:
        return <MeditationLibrary userData={userData} onUpdateUserData={handleUpdateUserData} />;
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Navigation
          currentPage={currentPage}
          coins={userData.coins}
          onPageChange={setCurrentPage}
        />
        
        <main className="relative">
          {renderCurrentPage()}
        </main>
        
        <Toaster />
      </div>
    </TooltipProvider>
  );
}

export default App;
