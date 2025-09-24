import { create } from 'zustand'

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("carrerConnect-theme") || "winter",
    setTheme: (theme) => {
        localStorage.setItem("carrerConnect-theme", theme);
        set({ theme })
    },
}))