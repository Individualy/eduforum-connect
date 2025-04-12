
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AssistantContextType {
  isAssistantVisible: boolean;
  toggleAssistantVisibility: () => void;
  showAssistant: () => void;
  hideAssistant: () => void;
}

const AssistantContext = createContext<AssistantContextType | null>(null);

export const useAssistant = () => {
  const context = useContext(AssistantContext);
  if (!context) {
    throw new Error('useAssistant must be used within an AssistantProvider');
  }
  return context;
};

interface AssistantProviderProps {
  children: ReactNode;
}

export const AssistantProvider: React.FC<AssistantProviderProps> = ({ children }) => {
  const [isAssistantVisible, setIsAssistantVisible] = useState(true);

  const toggleAssistantVisibility = () => {
    setIsAssistantVisible(prev => !prev);
  };

  const showAssistant = () => {
    setIsAssistantVisible(true);
  };

  const hideAssistant = () => {
    setIsAssistantVisible(false);
  };

  return (
    <AssistantContext.Provider value={{
      isAssistantVisible,
      toggleAssistantVisibility,
      showAssistant,
      hideAssistant
    }}>
      {children}
    </AssistantContext.Provider>
  );
};
