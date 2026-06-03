'use client';

import { createContext, useContext, useState } from 'react';

type CaninaTabContextType = {
  activeCategory: string;
  setActiveCategory: (slug: string) => void;
  hasProvider: boolean;
};

const CaninaTabContext = createContext<CaninaTabContextType>({
  activeCategory: 'nutricion-diaria',
  setActiveCategory: () => {},
  hasProvider: false,
});

export function CaninaTabProvider({ children }: { children: React.ReactNode }) {
  const [activeCategory, setActiveCategory] = useState('nutricion-diaria');
  return (
    <CaninaTabContext.Provider value={{ activeCategory, setActiveCategory, hasProvider: true }}>
      {children}
    </CaninaTabContext.Provider>
  );
}

export function useCaninaTab() {
  return useContext(CaninaTabContext);
}
