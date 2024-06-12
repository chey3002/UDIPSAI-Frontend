import { create } from 'zustand';

const isBrowser = typeof window !== 'undefined';

export const useUserContext = create((set) => ({
    user: isBrowser ? getUserFromLocalStorage() : null,
    setUser: (user) => {
        if (isBrowser) {
            const expirationTime = new Date().getTime() + 5 * 24 * 60 * 60 * 1000; // 5 días
            localStorage.setItem('user', JSON.stringify({ user, expirationTime }));
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

function getUserFromLocalStorage() {
    const userItem = localStorage.getItem('user');
    if (!userItem) {
        return null;
    }

    const { user, expirationTime } = JSON.parse(userItem);
    const now = new Date().getTime();

    if (now > expirationTime) {
        localStorage.removeItem('user');
        return null;
    }

    return user;
}
