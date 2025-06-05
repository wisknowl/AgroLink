import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Dimensions, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import Colors from '@/constants/colors';
import { FontAwesome } from '@expo/vector-icons';

const LOGO = require('@/assets/images/icon.png');
const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const { login, loginAsGuest } = useAuthStore();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(true);
  };

  const handleLoginSubmit = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    login({
      id: 'u123',
      name: 'John Doe',
      email: email,
      phone: '+237 6XX XXX XXX',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
      isFarmer: false,
    });
    setShowLoginModal(false);
    router.replace('/(tabs)');
  };

  const handleGuest = () => {
    loginAsGuest();
    router.replace('/(tabs)');
  };

  const handleRegister = () => {
    router.push('/auth/register');
  };

  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image
        source={require('@/assets/images/bg1.jpg')}
        style={styles.bgImage}
        resizeMode="cover"
      />
      {/* Overlay for darken effect */}
      <View style={styles.overlay} />
      {/* Top center logo, text, and taglines */}
      <View style={styles.topCenter}>
        <View style={styles.logoRow}>
          <Image source={LOGO} style={styles.logo} />
          <Text style={styles.logoText}>
            <Text style={{ color: '#8D5524' }}>Agro</Text>
            <Text style={{ color: '#3CB371' }}>Link</Text>
          </Text>
        </View>
        <View style={styles.taglines}>
          <Text style={styles.taglineMain}>Grow More, Earn Fair.</Text>
          <Text style={styles.taglineSub}>Wum mingi. Zwa na bôlô</Text>
        </View>
      </View>
      {/* Login button and skip */}
      <View style={styles.bottomCenter}>
        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
        <Pressable onPress={handleGuest} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>
      {/* Register at the bottom */}
      <View style={styles.bottomFooter}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Pressable onPress={handleRegister}>
          <Text style={styles.registerText}> Register</Text>
        </Pressable>
      </View>
      {/* Login Modal */}
      <Modal
        visible={showLoginModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowLoginModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sign in to your AgroLink account</Text>
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            {/* Email Input with Icon */}
            <View style={styles.inputWrapper}>
              <FontAwesome name="envelope" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Email or Phone"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#888"
              />
            </View>
            {/* Password Input with Icon and Toggler */}
            <View style={styles.inputWrapper}>
              <FontAwesome name="lock" size={20} color="#888" style={styles.inputIcon} />
              <TextInput
                style={styles.inputWithIcon}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                placeholderTextColor="#888"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                <FontAwesome name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#888" />
              </Pressable>
            </View>
            <Pressable style={styles.modalLoginButton} onPress={handleLoginSubmit}>
              <Text style={styles.loginButtonText}>Login</Text>
            </Pressable>
            <Pressable onPress={() => setShowLoginModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#000',
  },
  bgImage: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    zIndex: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
    zIndex: 1,
  },
  topCenter: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 16,
    marginRight: 0,
  },
  logoText: {
    fontSize: 38,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  taglines: {
    alignItems: 'center',
  },
  taglineMain: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '900',
    marginBottom: 8,
  },
  taglineSub: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '700',
    opacity: 0.95,
  },
  bottomCenter: {
    position: 'absolute',
    bottom: height * 0.22,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 2,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 80,
    alignItems: 'center',
    marginBottom: 18,
    elevation: 2,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 1,
  },
  skipButton: {
    marginBottom: 8,
  },
  skipText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
    textDecorationLine: 'underline',
  },
  bottomFooter: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  footerText: {
    color: '#fff',
    fontSize: 15,
    opacity: 0.85,
  },
  registerText: {
    color: Colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: 18,
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 8,
  },
  inputWithIcon: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#222',
  },
  eyeIcon: {
    padding: 4,
  },
  modalLoginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginBottom: 12,
    width: '100%',
  },
  cancelText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 16,
    marginTop: 4,
  },
  errorText: {
    color: Colors.error || 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});