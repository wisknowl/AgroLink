import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import { LogOut } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Add logout logic
    router.replace('/auth/login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      {/* Add your settings options here */}
      <Pressable style={styles.menuItem} onPress={handleLogout}>
        <LogOut size={20} color={Colors.error} />
        <Text style={styles.menuItemText}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemText: {
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 16,
    fontWeight: '600',
  },
});
