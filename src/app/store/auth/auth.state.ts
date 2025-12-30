export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};
