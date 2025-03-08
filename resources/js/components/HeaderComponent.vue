<template>
    <nav class="bg-white">
        <div class="flex items-center justify-between px-6 md:px-20 py-5 border-b-4 border-dashed border-gray-200">
            <router-link :to="{ name: 'home'}">
                <p class="font-bold text-5xl text-green-600 italic">
                    News<span class="text-slate-800">Wave</span>
                </p>
            </router-link>

            <div class="flex items-center gap-5">
                <p class="font-bold underline cursor-pointer flex items-center" data-modal-target="subscribe-modal" data-modal-toggle="subscribe-modal">
                    <i class="fa-regular fa-envelope pr-2 text-lg"></i>Subscribe
                </p>

                <!-- Show login button if user is NOT logged in -->
                <button v-if="!authStore.isAuthenticated"
                    data-modal-target="login-modal"
                    data-modal-toggle="login-modal"
                    class="border rounded-full py-2.5 px-6 bg-green-600 text-white font-bold cursor-pointer hover:bg-green-700 transition">
                    Login
                </button>

                <!-- Show profile icon if user is logged in -->
                <div v-else class="relative group">
                    <img 
                        :src="'../../images/defaultuser.png'" 
                        alt="Profile"
                        class="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                    />

                    <!-- Dropdown (Visible on Hover) -->
                    <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-300 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                        <ul class="py-2 text-gray-700">
                            <li>
                                <button @click="handleLogout" class="block w-full text-center px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-between px-6 md:px-20 py-4 border-b-4 border-dashed border-gray-200">
            <ul class="hidden md:flex space-x-6">
                <router-link :to="{ name: 'home'}">
                    <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition" :class="{ 'text-green-600': route.path === '/' }">
                        Home
                    </li>
                </router-link>
                <router-link :to="{ name: 'categoryNews', params: { category: 'general' } }">
                    <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition" :class="{ 'text-green-600': route.path === '/category/general' }">
                        General
                    </li>
                </router-link>
                <router-link :to="{ name: 'categoryNews', params: { category: 'sports' } }">
                    <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition" :class="{ 'text-green-600': route.path === '/category/sports' }">
                        Sports
                    </li>
                </router-link>
                <router-link :to="{ name: 'categoryNews', params: { category: 'business' } }">
                    <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition" :class="{ 'text-green-600': route.path === '/category/business' }">
                        Business
                    </li>
                </router-link>
                <router-link :to="{ name: 'categoryNews', params: { category: 'entertainment' } }">
                    <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition" :class="{ 'text-green-600': route.path === '/category/entertainment' }">
                        Entertainment
                    </li>
                </router-link>
                <router-link :to="{ name: 'categoryNews', params: { category: 'health' } }">
                    <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition" :class="{ 'text-green-600': route.path === '/category/health' }">
                        Health
                    </li>
                </router-link>
            </ul>

            <!-- Search Box with Icon Inside -->
            <div class="relative w-[400px]">
                <input type="text" placeholder="Search" v-model="search" class="w-full h-10 bg-gray-200 p-3 pl-4 pr-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                <i class="fa-solid fa-magnifying-glass absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer hover:text-black transition" @click="searchData"></i>
            </div>
        </div>
    </nav>


    <!-- Login modal -->
    <div id="login-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Sign in to newswave
                    </h3>
                    <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="login-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                    <div v-if="loginError" class="text-sm text-red-600 bg-red-100 p-2 rounded-md mb-4 dark:bg-red-200 dark:text-red-800">
                        {{ loginError }}
                    </div>
                    <div v-if="loginSuccess" class="text-sm text-green-600 bg-green-100 p-2 rounded-md mb-4 dark:bg-green-200 dark:text-green-800">
                        {{ loginSuccess }}
                    </div>
                    <form class="space-y-4" action="#" @submit.prevent="handleLogin">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" v-model="loginEmail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" v-model="loginPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <div class="flex justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                                </div>
                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                            </div>
                            <!-- <a href="#" class="text-sm text-green-700 hover:underline dark:text-green-500">Lost Password?</a> -->
                        </div>
                        <button type="submit" class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer">
                            <span v-if="loginLoading" :disabled="loginLoading">Loading...</span>
                            <span v-else>Login to your account</span>
                        </button>
                        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Not registered? <a href="#" data-modal-target="register-modal" data-modal-toggle="register-modal" class="text-green-700 hover:underline dark:text-green-500">Create account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Register modal -->
    <div id="register-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Sign up to newswave
                    </h3>
                    <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="register-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                    <div v-if="registerError" class="text-sm text-red-600 bg-red-100 p-2 rounded-md mb-4 dark:bg-red-200 dark:text-red-800">
                        {{ registerError }}
                    </div>
                    <div v-if="registerSuccess" class="text-sm text-green-600 bg-green-100 p-2 rounded-md mb-4 dark:bg-green-200 dark:text-green-800">
                        {{ registerSuccess }}
                    </div>
                    <form class="space-y-4" action="#" @submit.prevent="handleRegister">
                        <div>
                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input type="text" name="name" id="name" v-model="registerName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name" required />
                        </div>
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" v-model="registerEmail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                            <input type="password" name="password" id="password" v-model="registerPassword" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                        </div>
                        <button type="submit" class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer">
                            <span v-if="registerLoading" :disabled="registerLoading">Loading...</span>
                            <span v-else>Register your account</span>
                        </button>
                        <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Already registered? <a href="#" data-modal-target="login-modal" data-modal-toggle="login-modal" class="text-green-700 hover:underline dark:text-green-500">Login your account</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Subscribe modal -->
    <div id="subscribe-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <!-- Modal content -->
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                <!-- Modal header -->
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        Subscribe to newswave
                    </h3>
                    <button type="button" class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="subscribe-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <!-- Modal body -->
                <div class="p-4 md:p-5">
                    <div v-if="subscribeError" class="text-sm text-red-600 bg-red-100 p-2 rounded-md mb-4 dark:bg-red-200 dark:text-red-800">
                        {{ subscribeError }}
                    </div>
                    <div v-if="subscribeSuccess" class="text-sm text-green-600 bg-green-100 p-2 rounded-md mb-4 dark:bg-green-200 dark:text-green-800">
                        {{ subscribeSuccess }}
                    </div>
                    <form class="space-y-4" action="#" @submit.prevent="handleSubscribe">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" v-model="subscribeEmail" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                        </div>
                        <button type="submit" class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer">
                            <span v-if="subscribeLoading" :disabled="subscribeLoading">Submit</span>
                            <span v-else>Submit</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();

const router = useRouter();
const route = useRoute();
const search = ref(route.params.search || '');

const loginEmail = ref(null);
const loginPassword = ref(null);
const loginLoading = ref(false);
const loginError = ref(null);
const loginSuccess = ref(null);

const registerName = ref(null);
const registerEmail = ref(null);
const registerPassword = ref(null);
const registerLoading = ref(true);
const registerError = ref(null);
const registerSuccess = ref(null);

const subscribeEmail = ref(null);
const subscribeLoading = ref(true);
const subscribeError = ref(null);
const subscribeSuccess = ref(null);

const searchData = () => {
    if (!search.value) return;
    router.push({ name: 'searchNews', params: { search: search.value } });
};

const handleLogin = async () => {
    loginError.value = "";
    loginSuccess.value = "";

    if(loginEmail.value == '' || loginPassword.value == ''){
        loginError.value = "All filed required!";
        return;
    }

    try{
        loginLoading.value = true;

        const LoginResponse = await authStore.login({ email: loginEmail.value, password: loginPassword.value });
        
        if (LoginResponse.status) {
            loginSuccess.value = "Login successful! Redirecting...";
            setTimeout(() => {
                loginSuccess.value = "";
                window.location.reload();
            }, 3000);
        }
    }
    catch(error){
        if (error.response) {
            if (error.response.status === 401) {
                loginError.value = "Invalid email or password.";
            } else if (error.response.status === 422) {
                if (error.response.data.error?.email) {
                    loginError.value = error.response.data.error.email[0];
                } else {
                    loginError.value = "Login failed. Please check your credentials.";
                }
            } else {
                loginError.value = "Something went wrong! Please try again.";
            }
        } else {
            loginError.value = "Server is unreachable. Please try again later.";
        }

        console.error("Error:", error);
    }
    finally{
        loginLoading.value = false
    }
}

const handleRegister = async () => {
    registerError.value = "";
    registerSuccess.value = "";

    if(registerName.value == '' || registerEmail.value == '' || registerPassword.value == ''){
        registerError.value = "All filed required!";
        return;
    }

    // **Email Validation**
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(registerEmail.value)) {
        registerError.value = "Please enter a valid email address!";
        return;
    }

    // **Password Validation (Strength Check)**
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordPattern.test(registerPassword.value)) {
        registerError.value = "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character!";
        return;
    }

    try{
        registerLoading.value = true;

        const RegisterResponse = await authStore.register({ name: registerName.value, email: registerEmail.value, password: registerPassword.value });
        
        if (RegisterResponse.status) {
            registerSuccess.value = "Registration successful! Redirecting...";
            setTimeout(() => {
                registerSuccess.value = "";
                window.location.reload();
            }, 3000);
        }
    }
    catch(error){
        if (error.response && error.response.status === 422) {
            console.log(error.response.data);
            if (error.response.data.error?.email) {
                registerError.value = error.response.data.error.email[0];
            } else {
                registerError.value = "Registration failed. Please try again.";
            }
        } else {
            registerError.value = "Something went wrong! Please try again.";
        }
        console.error("Error:", error);
    }
    finally{
        registerLoading.value = false
    }
}

const handleLogout = () => {
    authStore.logout();

    window.location.reload();
};

const handleSubscribe = async () => {
    subscribeError.value = "";
    subscribeSuccess.value = "";

    if(subscribeEmail.value == ''){
        subscribeError.value = "Email filed required!";
        return;
    }

    try{
        subscribeLoading.value = true;

        const subscribeResponse = await authStore.subscribe({ email: subscribeEmail.value });
        
        if (subscribeResponse.status) {
            subscribeSuccess.value = subscribeResponse.data.message;
            subscribeEmail.value = "";
        }
    }
    catch (error) {
        if (error.response) {
            if (error.response.status === 401) {
                subscribeError.value = "Unauthorized access.";
            } else if (error.response.status === 422) {
                subscribeError.value = error.response.data.error?.email
                    ? error.response.data.error.email[0]
                    : "Invalid email format.";
            } else {
                subscribeError.value = "Something went wrong! Please try again.";
            }
        } else {
            subscribeError.value = "Server is unreachable. Please try again later.";
        }

        console.error("Subscription Error:", error);
    }
    finally{
        subscribeLoading.value = false
    }
}

onMounted(() => {
    authStore.checkAuth();
});

// Update search when route changes
watch(() => route.params.search, (newSearch) => {
    search.value = newSearch || '';
}, { immediate: true });
</script>