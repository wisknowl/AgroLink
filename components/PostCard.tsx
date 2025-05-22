import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Heart, MessageCircle, Share2, User } from 'lucide-react-native';
import { Post } from '@/types';
import { useFavoritesStore } from '@/store/favoritesStore';
import Colors from '@/constants/colors';

interface PostCardProps {
  post: Post;
  fullScreen?: boolean;
}

export default function PostCard({ post, fullScreen = false }: PostCardProps) {
  const { addPost, removePost, isPostFavorite } = useFavoritesStore();
  const isFavorite = isPostFavorite(post.id);

  const toggleLike = () => {
    if (isFavorite) {
      removePost(post.id);
    } else {
      addPost(post.id);
    }
  };

  const handleComment = () => {
    // Handle comment action
  };

  const handleShare = () => {
    // Handle share action
  };

  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <View style={styles.header}>
        <Image source={{ uri: post.farmerAvatar }} style={styles.avatar} />
        <View style={styles.headerText}>
          <Text style={styles.farmerName}>{post.farmerName}</Text>
          <Text style={styles.timestamp}>
            {new Date(post.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      
      <Image source={{ uri: post.media }} style={[styles.media, fullScreen && styles.fullScreenMedia]} />
      
      <View style={styles.content}>
        <Text style={styles.caption}>{post.content}</Text>
      </View>
      
      <View style={styles.actions}>
        <Pressable style={styles.actionButton} onPress={toggleLike}>
          <Heart 
            size={24} 
            color={isFavorite ? Colors.error : Colors.text.secondary} 
            fill={isFavorite ? Colors.error : 'none'} 
          />
          <Text style={styles.actionText}>{post.likes}</Text>
        </Pressable>
        
        <Pressable style={styles.actionButton} onPress={handleComment}>
          <MessageCircle size={24} color={Colors.text.secondary} />
          <Text style={styles.actionText}>{post.comments}</Text>
        </Pressable>
        
        <Pressable style={styles.actionButton} onPress={handleShare}>
          <Share2 size={24} color={Colors.text.secondary} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  fullScreen: {
    flex: 1,
    borderRadius: 0,
    marginBottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  media: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  fullScreenMedia: {
    height: 400,
  },
  content: {
    padding: 12,
  },
  caption: {
    fontSize: 14,
    color: Colors.text.primary,
    lineHeight: 20,
  },
  actions: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: Colors.text.secondary,
  },
});