import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, AgroYield } from '@/types';

interface BasketState {
  items: CartItem[];
  addToBasket: (yieldItem: AgroYield, quantity: number) => void;
  removeFromBasket: (id: string) => void;
  updateQuantity?: (id: string, quantity: number) => void;
  clearBasket: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useBasketStore = create<BasketState>()(
  persist(
    (set, get) => ({
      items: [],

      addToBasket: (yieldItem: AgroYield, quantity: number) => {
        const items = get().items;
        const existingItem = items.find(item => item.yieldId === yieldItem.id);
        if (existingItem) {
          set({
            items: items.map(item =>
              item.id === existingItem.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            items: [...items, {
              id: Date.now().toString(),
              yieldId: yieldItem.id,
              quantity,
              yield: yieldItem
            }]
          });
        }
      },

      removeFromBasket: (id: string) => {
        set({
          items: get().items.filter(item => item.id !== id)
        });
      },

      clearBasket: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce((total, item) => {
          return total + (item.yield.price * item.quantity);
        }, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'agrolink-basket',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
