import React, { createContext, useContext, useState } from 'react';

const SettingContext = createContext();


const SettingProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'th' : 'en');
  }

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

const SettingThemt = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <Text>Theme</Text>
      <Switch value={theme === 'dark'} onValueChange={toggleTheme} />
    </View>
  );
};

export default {SettingThemt , SettingProvider , SettingContext};
