<template>
    <HeaderComponent />
    <div class="">
        <h3 class="px-20 py-7 font-bold text-left text-5xl italic border-b-4 border-dashed border-gray-200">Breaking News</h3>
        <div class="mt-7">
            <div class="relative w-full h-[500px] bg-cover bg-center flex items-end px-20" style="background-image: url('/images/travel.jpg');">
                <div class="absolute inset-0 bg-black/30"></div>

                <div class="relative z-10 text-white">
                    <p class="text-left font-bold text-4xl text-white p-4 pb-10 rounded-md">
                        The Hidden Gems Of The US Open: Outside The Gates At Practice Courts P6 To P17
                    </p>
                </div>
            </div>

            <div class="px-20 py-5 flex justify-between gap-6">
                <BreakingNewsComponent />
                <BreakingNewsComponent />
                <BreakingNewsComponent />
            </div>
        </div>

        <h3 class="mt-7 px-20 py-7 font-bold text-left text-5xl italic border-b-4 border-dashed border-gray-200">Latest News <i class="fa-solid fa-angle-right pl-2 text-green-600"></i></h3>
        <div class="px-20 py-5 flex justify-between gap-6">
            <LatestNewsComponent />
            <LatestNewsComponent />
            <LatestNewsComponent />
        </div>

        <div class="px-20 py-5 flex justify-between gap-6">
            <CategoryNewsComponent />
            <CategoryNewsComponent />
        </div>

        <h3 class="mt-7 px-20 py-7 font-bold text-left text-5xl italic border-b-4 border-dashed border-gray-200">Top Headline <i class="fa-solid fa-angle-right pl-2 text-green-600"></i></h3>
        <div class="px-20 py-5 flex justify-between gap-6">
            <TopHeadlineComponent />
            <TopHeadlineComponent />
            <TopHeadlineComponent />
            <TopHeadlineComponent />
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
</script>