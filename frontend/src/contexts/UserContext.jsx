import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser deve ser usado dentro de um UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    autonomia: '',
    consumo: '',
    isConfigured: false
  });

  // Carregar dados do localStorage ao inicializar
  useEffect(() => {
    const savedUserData = localStorage.getItem('postoFinderUserData');
    if (savedUserData) {
      const parsedData = JSON.parse(savedUserData);
      setUserData(parsedData);
    }
  }, []);

  // Salvar dados no localStorage sempre que userData mudar
  useEffect(() => {
    localStorage.setItem('postoFinderUserData', JSON.stringify(userData));
  }, [userData]);

  const updateUserData = (newData) => {
    setUserData(prevData => ({
      ...prevData,
      ...newData,
      isConfigured: true
    }));
  };

  const clearUserData = () => {
    setUserData({
      autonomia: '',
      consumo: '',
      isConfigured: false
    });
    localStorage.removeItem('postoFinderUserData');
  };

  const value = {
    userData,
    updateUserData,
    clearUserData,
    isConfigured: userData.isConfigured
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

