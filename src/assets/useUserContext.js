import { create } from 'zustand';

export const useUserContext = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    setUser: (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        set({ user });
    },
    logout: () => {
        localStorage.removeItem('user');
        set({ user: null });
    },
}));
