import { useState, useEffect } from 'react';

function useLocalStorage(key, defaultValue) {
  // Create state variable to store localStorage value in state
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      
      // If value is already present in localStorage then return it
      if (value) {
        return JSON.parse(value);
      }
      
      // Else set default value in localStorage and then return it
      else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      console.error(`Error retrieving value from localStorage: ${error}`);
      return defaultValue;
    }
  });

  // this method update our localStorage and our state
  const setLocalStorageStateValue = (valueOrFn) => {
    let newValue;
    
    if (typeof valueOrFn === 'function') {
      const fn = valueOrFn;
      newValue = fn(localStorageValue);
    } else {
      newValue = valueOrFn;
    }

    try {
      localStorage.setItem(key, JSON.stringify(newValue));
      setLocalStorageValue(newValue);
    } catch (error) {
      console.error(`Error setting value in localStorage: ${error}`);
    }
  };

  return [localStorageValue, setLocalStorageStateValue];
}

export default useLocalStorage;
