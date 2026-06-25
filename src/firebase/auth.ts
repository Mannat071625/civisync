import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
} from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  return await signInWithPopup(auth, googleProvider);
};

export const loginAsGuest = async () => {
  return await signInAnonymously(auth);
};

export const logout = async () => {
  return await signOut(auth);
};