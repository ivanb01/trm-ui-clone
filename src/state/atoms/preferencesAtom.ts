import { atomWithStorage } from 'jotai/utils';

export interface ThemeConfiguration {
  darkMode?: boolean;
  fontFamily?: string;
  fontSize?: number;
  graphScheme?: string | undefined;
  primaryColor?: string;
  size?: boolean;
}

const localStorageKey = 'nites.theme';

export const preferencesAtom = atomWithStorage<ThemeConfiguration>(
  localStorageKey,
  { fontFamily: 'Ubuntu, serif', fontSize: 14, primaryColor: '#3e5764' },
  undefined,
  { getOnInit: true }
);

preferencesAtom.debugLabel = 'preferences';
