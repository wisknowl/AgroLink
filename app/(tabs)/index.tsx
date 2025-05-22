import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import TabHeader from '@/components/TabHeader';
import YieldCard from '@/components/YieldCard';
import PostCard from '@/components/PostCard';
import { agroYields, posts } from '@/mocks/data';
import { useFavoritesStore } from '@/store/favoritesStore';
import Colors from '@/constants/colors';

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('AgroYields');
  const { yields: favoriteYields, posts: favoritePosts } = useFavoritesStore();
  
  const tabs = ['AgroFeed', 'AgroYields', 'Favorites'];

  const renderYieldItem = ({ item }) => (
    <YieldCard item={item} />
  );

  const renderPostItem = ({ item }) => (
    <PostCard post={item} />
  );

  const filteredYields = activeTab === 'Favorites' 
    ? agroYields.filter(item => favoriteYields.includes(item.id))
    : agroYields;

  const filteredPosts = activeTab === 'Favorites'
    ? posts.filter(post => favoritePosts.includes(post.id))
    : posts;

  return (
    <View style={styles.container}>
      <TabHeader 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />

      {activeTab === 'AgroYields' && (
        <FlatList
          data={filteredYields}
          renderItem={renderYieldItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'AgroFeed' && (
        <FlatList
          data={filteredPosts}
          renderItem={renderPostItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {activeTab === 'Favorites' && (
        <ScrollView contentContainerStyle={styles.listContent}>
          {filteredPosts.length > 0 && (
            <>
              <FlatList
                data={filteredPosts}
                renderItem={renderPostItem}
                keyExtractor={item => item.id}
                scrollEnabled={false}
              />
            </>
          )}
          
          {filteredYields.length > 0 && (
            <FlatList
              data={filteredYields}
              renderItem={renderYieldItem}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={styles.columnWrapper}
              scrollEnabled={false}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});