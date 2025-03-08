import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        user: null,  // Stores user data
        token: null, // Stores authentication token
        isAuthenticated: false, // Tracks login status
    }),

    actions: {
        async login(credentials) {
            try {
                const response = await axios.post("api/login", credentials);
                
                if (response.data && response.data.token) {
                    this.token = response.data.token;  
                    this.user = response.data.user;  
                    this.isAuthenticated = true;  

                    // Store token in localStorage for persistence
                    localStorage.setItem("authToken", this.token);
                    localStorage.setItem("user", JSON.stringify(this.user));
                    
                    return response;
                }
            } catch (error) {
                console.error("Login failed:", error);
                throw error;
            }
        },

        async register(credentials) {
            try {
                const response = await axios.post("api/register", credentials);

                if (response.data && response.data.token) {
                    this.token = response.data.token;  
                    this.user = response.data.user;  
                    this.isAuthenticated = true;  

                    // Store token in localStorage for persistence
                    localStorage.setItem("authToken", this.token);
                    localStorage.setItem("user", JSON.stringify(this.user));
                    
                    return response;
                }
            } catch (error) {
                console.error("Registration failed:", error);
                throw error;
            }
        },

        logout() {
            this.token = null;
            this.user = null;
            this.isAuthenticated = false;

            // Remove token from localStorage
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
        },

        checkAuth() {
            const storedToken = localStorage.getItem("authToken");
            const storedUser = localStorage.getItem("user");

            if (storedToken && storedUser) {
                this.token = storedToken;
                this.user = JSON.parse(storedUser);
                this.isAuthenticated = true;
            }
        }
    }
});
