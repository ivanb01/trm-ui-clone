import { theme, ThemeConfig } from 'antd';
import type { AliasToken } from 'antd/es/theme/interface';
import { atom } from 'jotai';

import { preferencesAtom } from './preferencesAtom';

export const themeAtom = atom<ThemeConfig>((get) => {
  const preferences = get(preferencesAtom);
  const algorithms = [];
  if (preferences.darkMode) algorithms.push(theme.darkAlgorithm);
  if (preferences.size) algorithms.push(theme.compactAlgorithm);
  const token: Partial<AliasToken> = {};
  if (preferences.primaryColor) token.colorPrimary = preferences.primaryColor;
  if (preferences.fontSize) token.fontSize = preferences.fontSize;
  if (preferences.fontFamily) token.fontFamily = preferences.fontFamily;
  return {
    algorithm: algorithms.length ? algorithms : theme.defaultAlgorithm,
    token
  };
});
themeAtom.debugLabel = 'theme';
