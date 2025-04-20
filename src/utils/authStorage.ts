import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import {
  AuthStorageContextType,
  TokenType,
} from '@/src/context/AuthStorageContext';

class AuthStorage implements AuthStorageContextType {
  namespace: string;
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  getToken = async (type: TokenType): Promise<string | null> => {
    try {
      if (Platform.OS === 'web') {
        return localStorage.getItem(`${this.namespace}_${type}Token`);
      } else {
        return await SecureStore.getItemAsync(`${this.namespace}_${type}Token`);
      }
    } catch (e) {
      console.log(`Error fetching ${type} token:`, e);
      return null;
    }
  };

  setToken = async (token: string | null, type: TokenType): Promise<void> => {
    if (Platform.OS === 'web') {
      try {
        if (token === null) {
          localStorage.removeItem(`${this.namespace}_${type}Token`);
        } else {
          localStorage.setItem(`${this.namespace}_${type}Token`, token);
        }
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      if (token == null) {
        await SecureStore.deleteItemAsync(`${this.namespace}_${type}Token`);
      } else {
        await SecureStore.setItemAsync(`${this.namespace}_${type}Token`, token);
      }
    }
  };

  removeToken = async (type: TokenType): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(`${this.namespace}_${type}Token`);
    } else {
      await SecureStore.deleteItemAsync(`${this.namespace}_${type}Token`);
    }
  };
}

export default AuthStorage;
