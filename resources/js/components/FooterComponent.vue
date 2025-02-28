<template>
    <footer class="mt-8 py-10 px-6 md:px-20 text-center">
        <div class="mb-15">
            <p class="font-bold text-5xl text-green-600 italic">News<span class="text-slate-800">Wave</span></p>
        </div>

        <ul class="flex flex-wrap justify-center space-x-4 font-semibold text-gray-700 mb-10">
            <router-link :to="{ name: 'home'}"><li class="hover:text-green-600">Home</li></router-link>
            <span>|</span>
            <router-link :to="{ name: 'categoryNews', params: { category: 'general' } }"><li class="hover:text-green-600">General</li></router-link>
            <span>|</span>
            <router-link :to="{ name: 'categoryNews', params: { category: 'sports' } }"><li class="hover:text-green-600">Sports</li></router-link>
            <span>|</span>
            <router-link :to="{ name: 'categoryNews', params: { category: 'business' } }"><li class="hover:text-green-600">Business</li></router-link>
            <span>|</span>
            <router-link :to="{ name: 'categoryNews', params: { category: 'entertainment' } }"><li class="hover:text-green-600">Entertainment</li></router-link>
            <span>|</span>
            <router-link :to="{ name: 'categoryNews', params: { category: 'health' } }"><li class="hover:text-green-600">Health</li></router-link>
        </ul>

        <p class="text-gray-600 text-md md:w-2/3 mx-auto mb-8">
            At NewsWave, we prioritize accuracy, speed, and in-depth reporting. Our dedicated team of journalists and analysts work tirelessly to deliver credible news, insightful articles, and breaking updates. Whether you're looking for business trends, sports highlights, entertainment buzz, or the latest developments in health and wellness we have it all in one place.
        </p>

        <div class="flex justify-center space-x-4">
            <a href="#" class="w-12 h-12 flex items-center justify-center bg-green-600 rounded-full text-white text-2xl hover:bg-green-700 transition">
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#" class="w-12 h-12 flex items-center justify-center bg-green-600 rounded-full text-white text-2xl hover:bg-green-700 transition">
                <i class="fa-brands fa-twitter"></i>
            </a>
            <a href="#" class="w-12 h-12 flex items-center justify-center bg-green-600 rounded-full text-white text-2xl hover:bg-green-700 transition">
                <i class="fa-brands fa-facebook-f"></i>
            </a>
        </div>
    </footer>
</template>