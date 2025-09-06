import { useState, useRef, useEffect } from 'react';

interface UseAudioReturn {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => Promise<void>;
  setCurrentTime: (time: number) => void;
  error: string | null;
  loading: boolean;
}

export function useAudio(src?: string): UseAudioReturn {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (src) {
      setLoading(true);
      setError(null);
      
      audioRef.current = new Audio();
      const audio = audioRef.current;
      
      // Set up multiple source formats for better browser support
      audio.preload = 'metadata';
      audio.crossOrigin = 'anonymous';
      
      const setAudioData = () => {
        setDuration(audio.duration || 0);
        setCurrentTime(audio.currentTime || 0);
        setLoading(false);
      };

      const setAudioTime = () => setCurrentTime(audio.currentTime || 0);
      
      const handleError = (e: Event) => {
        console.warn('Audio load error:', e);
        setError('Failed to load audio');
        setLoading(false);
      };
      
      const handleCanPlay = () => {
        setLoading(false);
        setError(null);
      };

      audio.addEventListener('loadedmetadata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('error', handleError);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('ended', () => setIsPlaying(false));
      
      // Try to load the audio
      audio.src = src;
      audio.load();

      return () => {
        audio.removeEventListener('loadedmetadata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('ended', () => setIsPlaying(false));
        audio.pause();
        audio.src = '';
      };
    }
  }, [src]);

  const play = async (): Promise<void> => {
    if (audioRef.current && !loading) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setError(null);
      } catch (err: any) {
        console.warn('Audio play error:', err);
        setError('Unable to play audio. Please click to start.');
        setIsPlaying(false);
      }
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggle = async (): Promise<void> => {
    if (isPlaying) {
      pause();
    } else {
      await play();
    }
  };

  const handleSetCurrentTime = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return {
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    toggle,
    setCurrentTime: handleSetCurrentTime,
    error,
    loading,
  };
}
