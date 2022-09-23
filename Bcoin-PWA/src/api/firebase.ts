import { ethers } from 'ethers';
import { initializeApp } from 'firebase/app';

import { 
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";

import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { UserRegister } from '../pages/Register';
import { User } from '../hooks/useUser';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export async function createUser(userRegister: UserRegister) {
  const userCredential = await createUserWithEmailAndPassword(auth, userRegister.email, userRegister.password);
  const userId = userCredential.user!.uid;
  // const { password, ...user } = { ...userRegister, id:  }
  const { password, ...user } = userRegister;

  const encryptedWallet = await ethers.Wallet.createRandom().encrypt(password);

  const userDocRef = doc(db, 'user', userId);
  await setDoc(userDocRef, { ...user, encryptedWallet });
}

export async function signIn(email : string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userId = userCredential.user?.uid;

  const userDocRef = doc(db, 'user', userId);
  const userSnapshot = await getDoc(userDocRef);

  const user  = { id: userSnapshot.id, ...userSnapshot.data() };
  console.log('Usuário logado:', user);

  return user as User;
}
