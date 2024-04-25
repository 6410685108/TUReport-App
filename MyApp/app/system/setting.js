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
  };

  return (
    <SettingContext.Provider value={{ setting }}>
      {children}
    </SettingContext.Provider>
  );
};

const SettingTheme = () => {
  const { setting } = useContext(SettingContext);
  const { theme, toggleTheme } = setting;

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>Theme</Text>
      <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
    </View>
  );
};

export { SettingTheme, SettingProvider, SettingContext };


