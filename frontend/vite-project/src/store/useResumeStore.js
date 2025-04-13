import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { auth } from "../lib/firebase";
import toast from "react-hot-toast";

export const useResumeStore = create((set, get) => ({
  userResumes: [],
  selectedResume: null,
  resumes: [],

  uploadResume: async (resumeFile) => {
    const token = await auth.currentUser.getIdToken();
    try {
      const res = await axiosInstance.post(
        "/resume/upload-resume",
        { resumeFile: resumeFile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Resume Uploaded");
      set({ userResumes: [res.data, ...get().resumes] });
    } catch (error) {
      toast.error("Failed to upload resume");
      console.log(error.message);
    }
  },

  getUserResumes: async () => {
    const token = await auth.currentUser.getIdToken();
    try {
      const res = await axiosInstance.get("/resume/user-resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ userResumes: res.data });
    } catch (error) {
      toast.error("Failed to load user resumes");
      console.log(error.message);
    }
  },
  getAllResumes: async () => {
    try {
      const res = await axiosInstance.get("/resume/all-resumes");

      set({ resumes: res.data });
    } catch (error) {
      toast.error("Failed to load resumes");
      console.log(error.message);
    }
  },
}));
