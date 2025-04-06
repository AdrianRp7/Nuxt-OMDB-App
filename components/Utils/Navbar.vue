<template>
    <nav class="background-primary py-3 box-shadow-navbar">
        <div class="container mx-auto">
            <div class="flex px-4 md:hidden justify-between items-center">
                <nuxt-link to="/" class="text-primary hover:text-accent hover-transition text-2xl cursor-pointer">NuxtOMDb APP</nuxt-link>
                <div class="hamburguer-icon flex flex-col cursor-pointer" @click="showMobile = !showMobile">
                    <span class="background-secondary h-1 w-8 mb-2 hover-transition"></span>
                    <span class="background-secondary h-1 w-8 mb-2 hover-transition"></span>
                    <span class="background-secondary h-1 w-8 hover-transition"></span>
                </div>
            </div>
            <div class="background-primary desktop-bar hidden md:flex flex-col md:flex-row justify-center md:justify-between items-center pt-4 md:pt-0" :class="{'is-active': showMobile}">
                <nuxt-link to="/" class="text-primary hover:text-accent hidden md:block hover-transition text-2xl cursor-pointer">NuxtOMDb APP</nuxt-link>
                <div class="flex-basic gap-4">
                    <nuxt-link to="/movies" class="text-primary hover:text-accent text-center text-md">Movies</nuxt-link>
                    <nuxt-link to="/series" class="text-primary hover:text-accent text-center text-md">Series</nuxt-link>
                    <nuxt-link to="/contact" class="text-primary hover:text-accent text-center text-md">Contact</nuxt-link>
                </div>
            </div>
        </div>
    </nav>
</template>


<script lang="ts" setup>
    const showMobile = ref(true);
</script>

<style scoped>
    .hamburguer-icon:hover span {
        @apply bg-green-500 dark:bg-green-400;
    }

    .desktop-bar.is-active {
        @apply !flex;
    }

    .box-shadow-navbar {
        box-shadow: 0 2px 10px #ddd;
    }
</style>