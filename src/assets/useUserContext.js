import { create } from 'zustand';

const isBrowser = typeof window !== 'undefined';

export const useUserContext = create((set) => ({
    user: isBrowser ? JSON.parse(localStorage.getItem('user')) || null : null,
    setUser: (user) => {
        if (isBrowser) {
            localStorage.setItem('user', JSON.stringify(user));
        }
        set({ user });
    },
    logout: () => {
        if (isBrowser) {
            localStorage.removeItem('user');
        }
        set({ user: null });
    },
}));
