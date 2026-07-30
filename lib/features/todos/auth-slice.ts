import { MeResponse } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  socialLoading: boolean;
  error: string | null;
  user: MeResponse | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  socialLoading: false,
  error: null,
  user: null,
};

const authSlice = createSlice({ name: "auth", initialState, reducers: {} });
