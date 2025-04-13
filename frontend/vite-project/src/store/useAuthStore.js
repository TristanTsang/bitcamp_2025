import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import { firebaseErrorMessage } from "../lib/firebaseErrorMessage";

export const useAuthStore = create((set, get) => ({
  authUser: null,

  checkAuth: async () => {
    onAuthStateChanged(auth, async (user) => {
      try {
        const token = await user.getIdToken();
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
    });
  },

  signin: async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      get().checkAuth();
      toast.success("Successful log in");
    } catch (error) {
      console.log("Error in signup: ", error.message);
      toast.error("Login failed");
    }
  },
  signup: async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      get().checkAuth();
      toast.success("Successful signup");
    } catch (error) {
      const message = firebaseErrorMessage(error.code);
      toast.error(message);
      console.log("Error in signup: ", error.message);
    }
  },
  signout: async () => {
    try {
      auth.signOut();
      set({ authUser: null });
    } catch (error) {
      console.log("Error in checkAuth: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
