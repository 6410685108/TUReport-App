import React, { createContext, useState, ReactNode, useMemo } from 'react';

export interface SettingType {
  toggleLanguage: () => void;
  toggleTheme: () => void;
  theme: 'light' | 'dark';
  language: 'EN' | 'TH';
  setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  setLanguage: React.Dispatch<React.SetStateAction<'EN' | 'TH'>>;
}

export interface SettingContextType {
  setting: SettingType;
}

interface SettingProviderProps {
  children: ReactNode;
}

const SettingContext = createContext<SettingContextType>({} as SettingContextType);

const SettingProvider: React.FC<SettingProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'EN' | 'TH'>('EN');

  const toggleTheme = (): void => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = (): void => {
    setLanguage(language === 'EN' ? 'TH' : 'EN');
  };

  const setting: SettingType = useMemo(() => ({
    toggleLanguage,
    toggleTheme,
    theme,
    language,
    setTheme,
    setLanguage,
  }), [theme, language]);

  const contextValue = useMemo(() => ({ setting }), [setting]);

  return (
    <SettingContext.Provider value={contextValue}>
      {children}
    </SettingContext.Provider>
  );
};

export { SettingProvider, SettingContext };
