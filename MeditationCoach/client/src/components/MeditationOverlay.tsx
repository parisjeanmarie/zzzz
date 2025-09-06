import { useState, useEffect } from 'react';
import { X, Play, Pause, Volume2, AlertCircle } from 'lucide-react';
import { Meditation } from '../types';
import { useAudio } from '../hooks/useAudio';

interface MeditationOverlayProps {
  meditation: Meditation | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MeditationOverlay({ meditation, isOpen, onClose }: MeditationOverlayProps) {
  const [meditationTime, setMeditationTime] = useState(0);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  
  // Background audio (always playing)
  const backgroundAudio = useAudio(meditation?.backgroundSoundUrl);
  
  // Voice guidance audio (user controlled)
  const voiceAudio = useAudio(meditation?.voiceUrl);

  useEffect(() => {
    if (isOpen && meditation) {
      // Start timer
      const timer = setInterval(() => {
        setMeditationTime(prev => prev + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
        backgroundAudio.pause();
        voiceAudio.pause();
        setMeditationTime(0);
        setIsVoicePlaying(false);
        setHasUserInteracted(false);
      };
    }
  }, [isOpen, meditation]);
  
  const handleFirstInteraction = async () => {
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
      // Start background audio on first user interaction
      try {
        await backgroundAudio.play();
      } catch (err) {
        console.warn('Failed to start background audio:', err);
      }
    }
  };

  const handleVoiceToggle = async () => {
    await handleFirstInteraction();
    
    if (isVoicePlaying) {
      voiceAudio.pause();
      setIsVoicePlaying(false);
    } else {
      try {
        await voiceAudio.play();
        setIsVoicePlaying(true);
      } catch (err) {
        console.warn('Failed to play voice audio:', err);
        setIsVoicePlaying(false);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSeconds = (meditation?.duration || 0) * 60;
  const progress = totalSeconds > 0 ? (meditationTime / totalSeconds) * 100 : 0;

  if (!isOpen || !meditation) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="w-full h-full relative meditation-bg"
        style={{ backgroundImage: `url(${meditation.backgroundImage})` }}
      >
        <div className="absolute inset-0 flex flex-col justify-between p-6 bg-black/20">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <button
              data-testid="close-meditation"
              onClick={onClose}
              className="bg-black/30 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-black/40 transition-colors"
            >
              <X className="text-white w-6 h-6" />
            </button>
            <div className="bg-black/30 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
              <span className="text-white text-sm" data-testid="meditation-timer">
                {formatTime(meditationTime)} / {formatTime(totalSeconds)}
              </span>
            </div>
          </div>

          {/* Center content */}
          <div className="text-center text-white">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4" data-testid="meditation-title">
              {meditation.title}
            </h1>
            <p className="text-lg mb-8 opacity-90" data-testid="meditation-instructions">
              Take a deep breath and let yourself relax...
            </p>
            
            {/* Voice activity indicator */}
            <div className="flex items-center justify-center gap-2 mb-8" data-testid="voice-indicator">
              <Volume2 className="text-white/70 w-5 h-5" />
              <div className={`waveform w-24 h-1 ${isVoicePlaying ? 'opacity-100' : 'opacity-30'}`}></div>
            </div>
            
            {/* Audio error display */}
            {(backgroundAudio.error || voiceAudio.error) && (
              <div className="flex items-center justify-center gap-2 mb-4 text-white/80">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Audio may not be available</span>
              </div>
            )}
            
            {!hasUserInteracted && (
              <div className="text-white/80 text-sm mb-4">
                Click play to start the meditation audio
              </div>
            )}
          </div>

          {/* Bottom controls */}
          <div className="flex items-center justify-center gap-6">
            {/* Voice control */}
            <button
              data-testid="voice-toggle"
              onClick={handleVoiceToggle}
              disabled={voiceAudio.loading}
              className="bg-black/30 backdrop-blur-sm border border-white/30 rounded-full p-4 hover:bg-black/40 transition-colors disabled:opacity-50"
            >
              {voiceAudio.loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isVoicePlaying ? (
                <Pause className="text-white w-6 h-6" />
              ) : (
                <Play className="text-white w-6 h-6" />
              )}
            </button>
            
            {/* Progress bar */}
            <div className="flex-1 mx-4">
              <div className="bg-white/30 rounded-full h-2 relative">
                <div
                  className="bg-white rounded-full h-2 transition-all duration-1000"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                  data-testid="progress-bar"
                />
              </div>
            </div>
            
            {/* Background sound indicator */}
            <div className="bg-black/30 backdrop-blur-sm border border-white/30 rounded-full p-4">
              <Volume2 className={`w-6 h-6 ${backgroundAudio.isPlaying ? 'text-white' : 'text-white/50'}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
