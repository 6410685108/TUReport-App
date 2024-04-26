import React, { createContext, useContext, useState } from 'react';
import { View, Text, Switch } from 'react-native';

const SettingContext = createContext();

const SettingProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('EN');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'TH' : 'EN');
  };

  const setting = {
    toggleLanguage,
    toggleTheme,
    theme,
    language,
    setTheme,
    setLanguage,

  };

  return (
    <SettingContext.Provider value={{ setting }}>
      {children}
    </SettingContext.Provider>
  );
};


export {  SettingProvider, SettingContext };


