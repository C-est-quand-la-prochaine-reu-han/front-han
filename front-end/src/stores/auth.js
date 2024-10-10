import { defineStore } from 'pinia'

export const useAuthStore = defineStore( 'auth', {
    state: () => ({
        token: null,
        isConnected: false,
    }),
    actions: {
        setToken(token) {
            this.token = token;
            this.isConnected = true;
        },
        clearToken() {
            this.token = null;
            this.isConnected = false;
        }
    }
});