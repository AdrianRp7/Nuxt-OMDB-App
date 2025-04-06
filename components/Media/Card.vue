<template>
    <div class="background-primary card flex flex-col cursor-pointer p-2 border border-gray-300 dark:border-0 rounded-md h-full">
        <img :src="errorLoad ? '/img/image-no-available.jpg' : poster" class="aspect-ratio-16:9 object-fill h-96 md:h-64 lg:h-96" @error="errorLoad=true">
        <h4 class="text-md text-secondary">{{`${movie.Title} - (${movie.Year})`}}</h4>
    </div>
</template>

<script lang="ts" setup>
    const {movie} = defineProps<{movie: mediaItem}>();

    const poster = computed(() => {
        return movie.Poster === 'N/A' ? '/img/image-no-available.jpg' : movie.Poster
    })

    const errorLoad = ref(false)

</script>