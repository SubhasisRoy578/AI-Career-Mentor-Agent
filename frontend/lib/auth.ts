import { api, TOKEN_STORAGE_KEY } from '@/lib/api';
import { User } from '@/types/user';

type ApiResponse<T> = { success: boolean; message: string; data: T };
type AuthPayload = { user: User; accessToken: string };

export type RegisterInput = {
  fullName: string;
  email: string;
  password: string;
  education?: string;
  university?: string;
  currentSkills?: string;
  careerGoal?: string;
};

export type LoginInput = { email: string; password: string };
export type ProfileInput = Partial<Omit<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>>;

export const authApi = {
  async register(input: RegisterInput) {
    const { data } = await api.post<ApiResponse<AuthPayload>>('/auth/register', input);
    return data.data;
  },
  async login(input: LoginInput) {
    const { data } = await api.post<ApiResponse<AuthPayload>>('/auth/login', input);
    return data.data;
  },
  async me() {
    const { data } = await api.get<ApiResponse<User>>('/users/me');
    return data.data;
  },
  async updateProfile(input: ProfileInput) {
    const { data } = await api.patch<ApiResponse<User>>('/users/me', input);
    return data.data;
  },
  async changePassword(input: { currentPassword: string; newPassword: string }) {
    const { data } = await api.post<ApiResponse<{ changed: boolean }>>('/users/change-password', input);
    return data.data;
  },
  saveToken(token: string) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  },
  clearToken() {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY);
  },
  hasToken() {
    return typeof window !== 'undefined' && Boolean(window.localStorage.getItem(TOKEN_STORAGE_KEY));
  },
};
