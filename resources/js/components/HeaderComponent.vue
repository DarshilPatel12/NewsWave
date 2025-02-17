<template>
    <nav class="bg-white">
        <div class="flex items-center justify-between px-6 md:px-20 py-5 border-b-4 border-dashed border-gray-200">
            <p class="font-bold text-5xl text-green-600 italic">News<span class="text-slate-800">Wave</span></p>

            <div class="flex items-center gap-7">
                <p class="font-bold underline cursor-pointer"><i class="fa-regular fa-envelope pr-2 text-lg"></i>Subscribe</p>
                <button class="border rounded-full py-3 px-8 bg-green-600 text-white font-bold cursor-pointer">Login</button>
            </div>
        </div>

        <div class="flex items-center justify-between px-6 md:px-20 py-4 border-b-4 border-dashed border-gray-200">
            <ul class="hidden md:flex space-x-6">
                <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition text-green-600">
                    Home
                </li>
                <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition">
                    General
                </li>
                <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition">
                    Sports
                </li>
                <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition">
                    Business
                </li>
                <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition">
                    Entertainment
                </li>
                <li class="list-none cursor-pointer font-semibold hover:text-green-600 transition">
                    Health
                </li>
            </ul>

            <!-- Search Box with Icon Inside -->
            <div class="relative w-[400px]">
                <input type="text" placeholder="Search" class="w-full bg-gray-200 p-3 pl-4 pr-10 border border-white rounded-full focus:outline-none" />
                <i class="fa-solid fa-magnifying-glass absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"></i>
            </div>
        </div>
    </nav>
</template>

<script>

</script>