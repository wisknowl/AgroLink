import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, ShoppingCart } from 'lucide-react-native';
import { AgroYield } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import Colors from '@/constants/colors';

interface YieldCardProps {
  item: AgroYield;
}

export default function YieldCard({ item }: YieldCardProps) {
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { addYield, removeYield, isYieldFavorite } = useFavoritesStore();
  const isFavorite = isYieldFavorite(item.id);

  const handlePress = () => {
    router.push(`/yield/${item.id}`);
  };

  const handleAddToCart = () => {
    addToCart(item, 1);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeYield(item.id);
    } else {
      addYield(item.id);
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.price}>{item.price} FCFA/{item.unit}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.favoriteButton} onPress={toggleFavorite}>
          <Heart 
            size={22} 
            color={isFavorite ? Colors.error : Colors.text.secondary} 
            fill={isFavorite ? Colors.error : 'none'} 
          />
        </Pressable>
        <Pressable style={styles.cartButton} onPress={handleAddToCart}>
          <ShoppingCart size={20} color={Colors.text.light} />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: Colors.card,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 4,
  },
  category: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    paddingTop: 0,
  },
  favoriteButton: {
    padding: 8,
  },
  cartButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});