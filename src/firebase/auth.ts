import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInAnonymously,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./config";

export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const loginWithEmail = async (
  email: string,
  password: string
) => {
  return await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

export const registerWithEmail = async (
  email: string,
    password: string
) => {
  return await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
};
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);

  console.log("Google Login Success:", result.user);

  return result;
};

export const loginAsGuest = async () => {
  return await signInAnonymously(auth);
};

export const logout = async () => {
  return await signOut(auth);
};