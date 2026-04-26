import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Listing } from '@/data/listings';
import { useAuth } from './AuthContext';

interface SavedItemsContextType {
  savedItems: Listing[];
  addToSaved: (listing: Listing) => void;
  removeFromSaved: (listingId: string) => void;
  isSaved: (listingId: string) => boolean;
  savedCount: number;
}

const SavedItemsContext = createContext<SavedItemsContextType | undefined>(undefined);

export function SavedItemsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [savedItems, setSavedItems] = useState<Listing[]>([]);

  // Load saved items from localStorage on mount
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`scrapwise_saved_${user.id}`);
      if (stored) {
        setSavedItems(JSON.parse(stored));
      }
    }
  }, [user]);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (user && savedItems.length > 0) {
      localStorage.setItem(`scrapwise_saved_${user.id}`, JSON.stringify(savedItems));
    }
  }, [savedItems, user]);

  const addToSaved = (listing: Listing) => {
    setSavedItems(prev => {
      if (prev.some(item => item.id === listing.id)) {
        return prev;
      }
      return [...prev, listing];
    });
  };

  const removeFromSaved = (listingId: string) => {
    setSavedItems(prev => prev.filter(item => item.id !== listingId));
  };

  const isSaved = (listingId: string) => {
    return savedItems.some(item => item.id === listingId);
  };

  return (
    <SavedItemsContext.Provider
      value={{
        savedItems,
        addToSaved,
        removeFromSaved,
        isSaved,
        savedCount: savedItems.length,
      }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = useContext(SavedItemsContext);
  if (context === undefined) {
    throw new Error('useSavedItems must be used within a SavedItemsProvider');
  }
  return context;
}
