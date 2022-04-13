import { createContext, useContext } from 'react';

import type { BrighteTheme } from './make-theme';
import { makeBrighteTheme } from './make-theme';
import { defaultTokens } from './tokens';

export const defaultTheme = makeBrighteTheme(defaultTokens);

export const ThemeContext = createContext<BrighteTheme>(defaultTheme);
export const ThemeProvider = ThemeContext.Provider;

export const useTheme = (): BrighteTheme => useContext(ThemeContext);
