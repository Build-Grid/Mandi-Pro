import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type AuthState = {
    token: string | null;
    isAuthenticated: boolean;
    setToken: (token: string) => void;
    clearToken: () => void;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            isAuthenticated: false,
            setToken: (token) => set({ token, isAuthenticated: true }),
            clearToken: () => set({ token: null, isAuthenticated: false }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        },
    ),
);
