import { createSlice } from '@reduxjs/toolkit';

// Get initial theme from localStorage or default to system preference
const getInitialTheme = () => {
  // Default to light if we can't access window
  if (typeof window === 'undefined') return 'light';
  
  // Check localStorage for explicit theme preference
  if ('theme' in localStorage) {
    return localStorage.getItem('theme');
  }
  
  // Use system preference if no explicit choice was made
  const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return userPrefersDark ? 'dark' : 'light';
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getInitialTheme(),
    // Whether the current theme comes from system preference or explicit choice
    isSystemPreference: !('theme' in localStorage)
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'dark' ? 'light' : 'dark';
      state.isSystemPreference = false;
      localStorage.setItem('theme', state.mode);
    },
    setTheme: (state, action) => {
      const theme = action.payload;
      if (theme === 'system') {
        // Use system preference
        state.isSystemPreference = true;
        localStorage.removeItem('theme');
        // Set the state to match current system preference
        state.mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      } else {
        state.mode = theme;
        state.isSystemPreference = false;
        localStorage.setItem('theme', theme);
      }
    },
    // Handle system preference changes when using system theme
    updateThemeFromSystem: (state) => {
      if (state.isSystemPreference) {
        state.mode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    }
  },
});

export const { toggleTheme, setTheme, updateThemeFromSystem } = themeSlice.actions;

export const selectTheme = (state) => state.theme.mode;
export const selectIsSystemPreference = (state) => state.theme.isSystemPreference;

export default themeSlice.reducer;