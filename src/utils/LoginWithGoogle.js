import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    // user info
    const user = result.user;

    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
    };
  } catch (error) {
    console.error("Google login failed:", error);
    throw error;
  }
};
