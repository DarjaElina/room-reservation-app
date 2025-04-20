import { createContext } from 'react';

export type TokenType = 'access' | 'refresh';

export interface AuthStorageContextType {
  getToken(type: TokenType): Promise<string | null>;
  setToken(accessToken: string | null, type: TokenType): Promise<void>;
  removeToken(type: TokenType): Promise<void>;
}

const AuthStorageContext = createContext<AuthStorageContextType | null>(null);

export default AuthStorageContext;
