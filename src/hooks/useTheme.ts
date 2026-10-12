import { useEffect, useState } from 'react';
import {
  applyTheme,
  readThemePreference,
  ThemePreference,
  writeTheme,
} from '../theme/theme';

export function useTheme() {
  const [preference, setPreference] = useState<ThemePreference>(readThemePreference);

  useEffect(() => {
    const apply = () => {
      const saved = readThemePreference();
      setPreference(saved);
      applyTheme(saved);
    };
    apply();
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', apply);
    window.addEventListener('storage', apply);
    window.addEventListener('bubufu-theme', apply);
    return () => {
      media.removeEventListener('change', apply);
      window.removeEventListener('storage', apply);
      window.removeEventListener('bubufu-theme', apply);
    };
  }, []);

  const setTheme = (next: ThemePreference) => {
    setPreference(next);
    writeTheme(next);
  };

  return { preference, setTheme };
}
