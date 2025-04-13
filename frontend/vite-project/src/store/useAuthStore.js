import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import toast from "react-hot-toast";

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
      toast.error("Failed to authenticate user");
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
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
      toast.error("Signup Failed");
      console.log("Error in signup: ", error.message);
    }
  },
}));
