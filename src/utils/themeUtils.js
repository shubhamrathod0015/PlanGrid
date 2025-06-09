/**
 * Applies the current theme to the document by adding/removing the 'dark' class
 * @param {string} theme - 'dark', 'light', or 'system'
 */
export const applyTheme = (theme) => {
  if (typeof document !== 'undefined') {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else if (theme === 'system') {
      // Use system preference
      localStorage.removeItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  }
};

/**
 * Initializes the theme based on localStorage or user preferences
 */
export const initializeTheme = () => {
  if (typeof document === 'undefined') return 'light';
  
  // Apply dark mode if stored theme is dark or if no theme is stored and system prefers dark
  document.documentElement.classList.toggle(
    'dark',
    localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  
  // Determine the current theme state
  if (localStorage.theme === 'dark') {
    return 'dark';
  } else if (localStorage.theme === 'light') {
    return 'light';
  } else {
    // System preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
};

/**
 * Listen for changes in system color scheme preference
 * @param {Function} callback - Function to call when preference changes
 */
export const watchSystemThemeChanges = (callback) => {
  if (typeof window === 'undefined') return;
  
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  const handleChange = (e) => {
    if (!('theme' in localStorage)) {
      // Only update if using system preference
      document.documentElement.classList.toggle('dark', e.matches);
      callback(e.matches ? 'dark' : 'light');
    }
  };
  
  // Modern browsers
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleChange);
  } else {
    // For older browsers
    mediaQuery.addListener(handleChange);
  }
  
  // Return cleanup function
  return () => {
    if (mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', handleChange);
    } else {
      mediaQuery.removeListener(handleChange);
    }
  };
};