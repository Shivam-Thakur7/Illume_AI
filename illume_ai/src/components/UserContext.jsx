// components/UserContext.jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      name: null,
      profilePicture: null,
      promptCount: 0,
      imageCount: 0
    };
  });

  const updateProfilePicture = (imageUrl) => {
    setUser(prev => {
      const updatedUser = {
        ...prev,
        profilePicture: imageUrl
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const updateGenerationStats = () => {
    setUser(prev => {
      const updatedUser = {
        ...prev,
        promptCount: (prev.promptCount || 0) + 1,
        imageCount: (prev.imageCount || 0) + 1
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      updateProfilePicture, 
      updateGenerationStats 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
