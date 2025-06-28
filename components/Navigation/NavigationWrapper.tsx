'use client';

import { useTheme } from '../../app/context/ThemeContext';
import { Navigation } from '@/components/Navigation/Navigation';

export function NavigationWrapper() {
  const { theme } = useTheme();
  return <Navigation style={theme} />;
}
