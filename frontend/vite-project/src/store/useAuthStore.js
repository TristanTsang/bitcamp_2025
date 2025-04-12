import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const useAuthStore = create((set, get) => ({
  authUser: null,

  checkAuth: async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await axiosInstance.get("/auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signin: async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      get().checkAuth();
    } catch (error) {
      console.log("Error in signup: ", error.message);
    }
  },
  signup: async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      get().checkAuth();
    } catch (error) {
      console.log("Error in signup: ", error.message);
    }
  },
}));
