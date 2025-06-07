import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ShoppingCart, MoreVertical, Heart, HeartOff } from 'lucide-react-native';
import { AgroYield } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useFavoritesStore } from '@/store/favoritesStore';
import Colors from '@/constants/colors';
import { Post } from '@/types';
import { farmers } from '@/mocks/data';


interface YieldCardProps {
  item: AgroYield;
  popupVisible: boolean;
  onOpenPopup: () => void;
  onClosePopup: () => void;
}

export default function YieldCard({ item, popupVisible, onOpenPopup, onClosePopup }: YieldCardProps) {
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { addYield, removeYield, isYieldFavorite } = useFavoritesStore();
  const isFavorite = isYieldFavorite(item.id);
  const [localModalVisible, setLocalModalVisible] = useState(false);

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

  const farmer = farmers.find(f => f.id === item.farmerId);

  return (
    <View style={styles.container}>
      <Pressable onPress={handlePress}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </Pressable>
      <View style={styles.content}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{item.price} FCFA/{item.unit}</Text>
          {item.oldPrice && (
            <Text style={styles.oldPrice}>{item.oldPrice} FCFA</Text>
          )}
        </View>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.actions}>
        <View style={styles.ratingContainer}>
          {[1,2,3,4,5].map((star) => (
            <Text key={star} style={star <= Math.round(item.rating ?? 0) ? styles.starFilled : styles.starEmpty}>★</Text>
          ))}
          <Text style={styles.ratingText}>{item.rating?.toFixed(1) ?? '0.0'}</Text>
        </View>
        <View style={styles.actionButtonsRow}>
          <Pressable style={styles.cartButton} onPress={handleAddToCart}>
            <ShoppingCart size={13} color={Colors.text.light} />
          </Pressable>
          <Pressable style={styles.moreButton} onPress={onOpenPopup}>
            <MoreVertical size={18} color={Colors.text.secondary} />
          </Pressable>
        </View>
      </View>
      {popupVisible && (
        <Pressable style={styles.fullScreenOverlay} onPress={onClosePopup}>
          <View style={styles.modalContent}>
            <Pressable style={styles.modalRow} onPress={() => {/* handle add to wish list */}}>
              <Heart size={22} color={Colors.primary} />
              <Text style={styles.modalText}>Add to wish list</Text>
            </Pressable>
            <Pressable style={styles.modalRow} onPress={() => {/* handle don't like */}}>
              <HeartOff size={22} color={Colors.error} />
              <Text style={styles.modalText}>Don't like this product</Text>
            </Pressable>
            <Pressable style={styles.modalRow} onPress={() => {/* handle chat with farmer */}}>
              <Image source={{ uri: farmer?.profilePhoto }} style={styles.farmerAvatar} />
              <Text style={styles.modalText}>Chat with Farmer</Text>
            </Pressable>
          </View>
        </Pressable>
      )}
    </View>
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
    position: 'relative', // Needed for local overlay
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primary,
  },
  oldPrice: {
    fontSize: 13,
    color: Colors.text.secondary,
    textDecorationLine: 'line-through',
    marginLeft: 8,
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starFilled: {
    color: '#FFD700', // gold
    fontSize: 10,
    marginRight: 1,
  },
  starEmpty: {
    color: '#ccc',
    fontSize: 10,
    marginRight: 1,
  },
  ratingText: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginLeft: 4,
    fontWeight: '600',
  },
  cartButton: {
    backgroundColor: Colors.primary,
    borderRadius: 6, // Reduced
    padding: 6,      // Reduced
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,  // Space between cart and more button
  },
  moreButton: {
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fullScreenOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 24,
    minWidth: 220,
    alignItems: 'flex-start',
    elevation: 5,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    width: '100%',
  },
  modalText: {
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 16,
    fontWeight: '500',
  },
  farmerAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 4,
  },
});