import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  updateProfile,
  User 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";
import { UserProfile } from "@/types/auth";
import { LoginData, RegisterData } from "@/types/forms";

export const mapUser = (user: User): UserProfile => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
});

export const authApi = {
  register: async ({ email, password, name }: RegisterData) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    await updateProfile(user, { displayName: name });
    
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: name,
      createdAt: new Date().toISOString(),
      role: 'user' 
    });

    return mapUser(user);
  },

  login: async ({ email, password }: LoginData) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return mapUser(userCredential.user);
  },

  logout: async () => {
    await firebaseSignOut(auth);
  },
  
  getUserProfile: async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  }
};