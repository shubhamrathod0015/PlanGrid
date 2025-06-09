import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme, selectIsSystemPreference, updateThemeFromSystem } from './features/theme/themeSlice';
import { applyTheme, watchSystemThemeChanges } from './utils/themeUtils';
import Board from './components/Board/Board';

function App() {
  const theme = useSelector(selectTheme);
  const isSystemPreference = useSelector(selectIsSystemPreference);
  const dispatch = useDispatch();
  
  // Apply theme when it changes
  useEffect(() => {
    if (isSystemPreference) {
      applyTheme('system');
    } else {
      applyTheme(theme);
    }
    
    // Set CSS variables for drag-drop theming
    const root = document.documentElement;
    if (theme === 'dark') {
      root.style.setProperty('--card-bg', '#374151');
      root.style.setProperty('--list-bg', '#1f2937');
      root.style.setProperty('--dragging-card-bg', '#4b5563');
      root.style.setProperty('--dragging-list-bg', '#374151');
    } else {
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--list-bg', '#f1f5f9');
      root.style.setProperty('--dragging-card-bg', '#e0f7fa');
      root.style.setProperty('--dragging-list-bg', '#f0f9ff');
    }
  }, [theme, isSystemPreference]);
  
  // Listen for system theme changes
  useEffect(() => {
    // Only set up the listener if we're using system preference
    if (isSystemPreference) {
      const cleanup = watchSystemThemeChanges(() => {
        dispatch(updateThemeFromSystem());
      });
      
      return cleanup;
    }
  }, [isSystemPreference, dispatch]);

  return (
    <div className="min-h-screen transition-colors duration-200 
                  bg-gray-100 dark:bg-gray-900 
                  text-gray-900 dark:text-gray-100">
      <Board />
    </div>
  );
}

export default App;