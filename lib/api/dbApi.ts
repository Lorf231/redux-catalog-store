import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { CartItem } from "@/types/cart";

export const dbApi = {
  saveCart: async (uid: string, items: CartItem[]) => {
    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, { cart: items }, { merge: true });
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  },

  getCart: async (uid: string): Promise<CartItem[]> => {
    try {
      const userRef = doc(db, "users", uid);
      const snap = await getDoc(userRef);

      if (snap.exists() && snap.data().cart) {
        return snap.data().cart as CartItem[];
      }
      return [];
    } catch (error) {
      console.error("Error fetching cart:", error);
      return [];
    }
  }
};