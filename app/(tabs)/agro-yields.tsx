import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, Text } from 'react-native';
import { Search, Filter } from 'lucide-react-native';
import YieldCard from '@/components/YieldCard';
import { agroYields } from '@/mocks/data';
import Colors from '@/constants/colors';

export default function AgroYieldsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredYields, setFilteredYields] = useState(agroYields);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredYields(agroYields);
    } else {
      const filtered = agroYields.filter(item => 
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredYields(filtered);
    }
  };

  const renderYieldItem = ({ item }) => (
    <YieldCard
      item={item}
      popoverVisible={openPopoverId === item.id}
      onOpenPopover={() => setOpenPopoverId(item.id)}
      onClosePopover={() => setOpenPopoverId(null)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.text.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products, categories..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={Colors.text.secondary}
        />
      </View>

      {filteredYields.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No products found</Text>
          <Text style={styles.emptySubtext}>
            Try searching with different keywords
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredYields}
          renderItem={renderYieldItem}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 8 }}
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: 12,
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: Colors.text.primary,
  },
  listContent: {
    padding: 2,
    paddingTop: 0,
  },
  columnWrapper: {
    justifyContent: 'space-around',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
  },
});