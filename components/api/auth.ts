import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.100.20:5000/api/auth';

export const register = async (name: string, email: string, phone: string, password: string) => {
    console.log('Received registration:', { name, email, phone, password });
    // process.exit();
  const res = await axios.post(`${API_URL}/register`, { name, email, phone, password });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
  if (res.data.token) {
    await AsyncStorage.setItem('token', res.data.token);
  }
  return res.data;
};

export const getMe = async () => {
  const token = await AsyncStorage.getItem('token');
  if (!token) throw new Error('No token');
  const res = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
