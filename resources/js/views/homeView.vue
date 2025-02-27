<template>
    <HeaderComponent />
    <div class="">
        <h3 class="px-20 py-7 font-bold text-left text-5xl italic border-b-4 border-dashed border-gray-200">Breaking News</h3>
        <div class="mt-7" v-if="!breakingNewsLoading && breakingNews.length > 0">
            <router-link :to="{ name: 'particularNews', params: { id: breakingNews[0]?.id } }">
                <div class="relative w-full h-[500px] bg-cover bg-center flex items-end px-20" :style="{ backgroundImage: `url(${breakingNews[0]?.urlToImage || 'fallback-image.jpg'})` }">
                    <div class="absolute inset-0 bg-black/30"></div>

                    <div class="relative z-10 text-white">
                        <p class="text-left font-bold text-4xl text-white p-4 pb-10 rounded-md">
                            {{ breakingNews[0].title }}
                        </p>
                    </div>
                </div>
            </router-link>

            <div class="px-20 py-5 grid grid-cols-3 gap-6">
                <BreakingNewsComponent 
                    v-for="(newsItem, index) in breakingNews.slice(1, 4)" 
                    :key="index" 
                    :news="newsItem"
                />
            </div>
        </div>
        <div class="mt-7" v-else>
            <div class="relative w-full h-[500px] bg-cover bg-center flex items-end px-20 animate-pulse">
                <div class="absolute inset-0 bg-gray-300"></div>
            </div>

            <div class="px-20 py-5 grid grid-cols-3 gap-6">
                <template v-for="i in 3" :key="i">
                    <div class="flex items-center gap-6 animate-pulse">
                        <div class="w-30 h-30 bg-gray-300 rounded"></div>
                        <div>
                            <div class="bg-gray-400 h-6 w-48 mb-2"></div>
                            <div class="bg-gray-300 h-4 w-64"></div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

        <router-link :to="{ name: 'latestNews'}"><h3 class="mt-7 px-20 py-7 font-bold text-left text-5xl italic border-b-4 border-dashed border-gray-200">Latest News <i class="fa-solid fa-angle-right pl-2 text-green-600"></i></h3></router-link>
        <div class="px-20 py-5 grid grid-cols-3 gap-6" v-if="!latestNewsLoading && latestNews.length > 0">
            <LatestNewsComponent
                v-for="(newsItem, index) in latestNews.slice(0, 3)" 
                :key="index" 
                :news="newsItem"
            />
        </div>
        <div class="px-20 py-5 grid grid-cols-3 gap-6" v-else>
            <template v-for="i in 3" :key="i">
                <div class="w-full flex flex-col items-start space-y-3 text-left animate-pulse">
                    <div class="w-full h-50 bg-gray-300 rounded-lg"></div>

                    <div class="w-3/4 h-6 bg-gray-300 rounded"></div>
                    <div class="w-full h-4 bg-gray-300 rounded"></div>

                    <div class="pt-7 flex items-center space-x-2 text-gray-500">
                        <div class="w-4 h-4 bg-gray-300 rounded-full"></div>
                        <div class="w-16 h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </template>
        </div>

        <div class="px-20 py-5 grid grid-cols-2 gap-6" v-if="!latestNewsLoading && latestNews.length > 0">
            <CategoryNewsComponent 
                v-for="(newsItem, index) in latestNews.slice(3, 5)" 
                :key="index" 
                :news="newsItem"
            />
        </div>
        <div class="px-20 py-5 grid grid-cols-2 gap-6" v-else>
            <template v-for="i in 2" :key="i">
                <div class="relative w-full h-[500px] bg-cover bg-center flex flex-col justify-end px-5 pb-6 animate-pulse">
                    <div class="absolute inset-0 bg-gray-300"></div>
                    
                    <div class="relative z-10 text-white">
                        <div class="bg-gray-400 h-5 w-24 mb-2 rounded"></div>
                        <div class="bg-gray-500 h-10 w-3/4 rounded"></div>
                    </div>
                </div>
            </template>
        </div>

        <router-link :to="{ name: 'topHeadlineNews'}"><h3 class="mt-7 px-20 py-7 font-bold text-left text-5xl italic border-b-4 border-dashed border-gray-200">Top Headline <i class="fa-solid fa-angle-right pl-2 text-green-600"></i></h3></router-link>
        <div class="px-20 py-5 grid grid-cols-4 gap-6" v-if="!topHeadlineNewsLoading && topHeadlineNews.length > 0">
            <TopHeadlineComponent 
                v-for="(newsItem, index) in topHeadlineNews.slice(0, 4)" 
                :key="index" 
                :news="newsItem"
            />
        </div>
        <div class="px-20 py-5 grid grid-cols-4 gap-6" v-else>
            <template v-for="i in 4" :key="i">
                <div class="w-full flex flex-col items-start space-y-3 text-left animate-pulse">
                    <div class="w-full h-50 rounded-lg bg-gray-300"></div>
                    <div class="w-3/4 h-5 bg-gray-300 rounded"></div>

                    <div class="w-full h-4 bg-gray-300 rounded"></div>
                    <div class="w-5/6 h-4 bg-gray-300 rounded"></div>

                    <div class="pt-7 flex items-center space-x-2">
                        <div class="w-5 h-5 bg-gray-300 rounded-full"></div>
                        <div class="w-16 h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </template>
        </div>

        <div class="mt-7 relative w-full h-[400px] bg-cover bg-center flex justify-center items-center px-20" style="background-image: url('/images/darkgreen.jpg');">
            <div class="w-full bg-white p-10 rounded-lg shadow-lg flex items-center justify-between">
                <div class="w-1/2 flex flex-col justify-center pr-6">
                    <i class="fa-solid fa-arrow-right text-green-600 text-2xl mb-4"></i>
                    <h2 class="text-2xl font-bold text-gray-800">Sign Up for the <span class="text-green-600">NewsWave</span> Daily Newsletter</h2>
                    <p class="text-gray-600 mt-2">Our biggest stories, delivered to your inbox every day.</p>
                </div>

                <div class="w-1/2 bg-gray-100 p-6 rounded-lg">
                    <label class="text-gray-700 font-semibold block mb-2">Your Email</label>
                    <div class="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
                        <input type="email" placeholder="Email address" class="w-full px-4 py-3 text-gray-700 focus:outline-none">
                        <button class="bg-green-600 text-white px-6 py-3 font-bold hover:bg-green-700 transition">Submit</button>
                    </div>
                    <p class="text-gray-500 text-sm mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas minus iusto consectetur ullam pariatur atque.</p>
                </div>
            </div>
        </div>
    </div>
    <FooterComponent />
</template>

<script setup>
import HeaderComponent from '../components/HeaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';
import BreakingNewsComponent from '../components/BreakingNewsComponent.vue';
import LatestNewsComponent from '../components/LatestNewsComponent.vue';
import CategoryNewsComponent from '../components/CategoryNewsComponent.vue';
import TopHeadlineComponent from '../components/TopHeadlineComponent.vue';
import { ref, onMounted } from 'vue';
import { useNewsStore } from '@/stores/NewsStore';

const newsStore = useNewsStore();

const breakingNews = ref(null);
const breakingNewsLoading = ref(true);

const latestNews = ref(null);
const latestNewsLoading = ref(true);

const topHeadlineNews = ref(null);
const topHeadlineNewsLoading = ref(true);

const getBreakingNews = async () => {
    try {
        const breakingNewsResponse = await newsStore.getBreakingNews();

        if (breakingNewsResponse.data) {
            breakingNews.value = breakingNewsResponse.data.data;
        }
    }
    catch (error) {
        console.log("Error:", error);
    }
    finally {
        breakingNewsLoading.value = false;
    }
}

const getLatestNews = async () => {
    try {
        const latestNewsResponse = await newsStore.getLatestNews();

        if (latestNewsResponse.data) {
            latestNews.value = latestNewsResponse.data.data.data;
        }
    }
    catch (error) {
        console.log("Error:", error);
    }
    finally {
        latestNewsLoading.value = false;
    }
}

const getTopHeadlineNews = async () => {
    try {
        const topHeadlineNewsResponse = await newsStore.getTopHeadlineNews();

        if (topHeadlineNewsResponse.data) {
            topHeadlineNews.value = topHeadlineNewsResponse.data.data.data;
        }
    }
    catch (error) {
        console.log("Error:", error);
    }
    finally {
        topHeadlineNewsLoading.value = false;
    }
}

onMounted(async () => {
    getBreakingNews();
    getLatestNews();
    getTopHeadlineNews();
});
</script>