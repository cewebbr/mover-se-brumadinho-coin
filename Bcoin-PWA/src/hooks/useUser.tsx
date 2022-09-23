import { createContext, useContext, ReactNode, useState } from 'react'

import api from '../api';

export type User = {
  id: string
  type: 'PJ' | 'PF';
  email: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  cnpj?: string;
  companyName?: string;
  telephone?: string;
  cellPhone?: string;
  encryptedWallet: string;
};

type UserContextData = {
  user: User,
  login: (email: string, password: string) => Promise<User>,
}

type UserProviderProps = {
  children: ReactNode,
}

const UserContext = createContext({} as UserContextData);

export function UserProvider ({ children } : UserProviderProps){
  const [user, setUser] = useState({} as User);

  async function login(email : string, password: string) {  
    const user = await api.signIn(email, password);

    await api.setSigner(user, password);
    setUser(user as User);

    return user;
  }

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser(){
  const context = useContext(UserContext);

  return context;
}