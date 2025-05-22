import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronRight, LogOut, Settings, ShoppingBag, User, UserPlus } from 'lucide-react-native';
import { useAuthStore } from '@/store/authStore';
import Colors from '@/constants/colors';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleRegister = () => {
    router.push('/auth/register');
  };

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.authContainer}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>AgroLink</Text>
          <Text style={styles.logoSubtext}>Cameroon</Text>
        </View>
        
        <Text style={styles.authTitle}>Welcome to AgroLink</Text>
        <Text style={styles.authSubtitle}>
          Connect with farmers, discover fresh produce, and share agricultural stories
        </Text>
        
        <Pressable style={styles.primaryButton} onPress={handleLogin}>
          <Text style={styles.primaryButtonText}>Login</Text>
        </Pressable>
        
        <Pressable style={styles.secondaryButton} onPress={handleRegister}>
          <Text style={styles.secondaryButtonText}>Create Account</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ 
            uri: user?.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' 
          }} 
          style={styles.avatar} 
        />
        <Text style={styles.name}>{user?.name || 'AgroLink User'}</Text>
        <Text style={styles.email}>{user?.email || 'user@example.com'}</Text>
        
        {!user?.isFarmer && (
          <Pressable style={styles.becomeButton}>
            <Text style={styles.becomeButtonText}>Become a Farmer</Text>
          </Pressable>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <Pressable style={styles.menuItem}>
          <User size={20} color={Colors.text.primary} />
          <Text style={styles.menuItemText}>Edit Profile</Text>
          <ChevronRight size={20} color={Colors.text.secondary} />
        </Pressable>
        
        <Pressable style={styles.menuItem}>
          <ShoppingBag size={20} color={Colors.text.primary} />
          <Text style={styles.menuItemText}>My Orders</Text>
          <ChevronRight size={20} color={Colors.text.secondary} />
        </Pressable>
        
        <Pressable style={styles.menuItem}>
          <Settings size={20} color={Colors.text.primary} />
          <Text style={styles.menuItemText}>Settings</Text>
          <ChevronRight size={20} color={Colors.text.secondary} />
        </Pressable>
      </View>
      
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color={Colors.error} />
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  becomeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  becomeButtonText: {
    color: Colors.text.light,
    fontWeight: '600',
  },
  section: {
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.error,
    marginLeft: 16,
    fontWeight: '600',
  },
  authContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoText: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.primary,
  },
  logoSubtext: {
    fontSize: 18,
    color: Colors.text.secondary,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 12,
  },
  authSubtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 32,
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.light,
  },
  secondaryButton: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
  },
});