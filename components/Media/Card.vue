<template>
    <div class="background-primary card flex flex-col cursor-pointer p-2 border border-gray-300 dark:border-0 rounded-md h-full">
        <img :src="errorLoad ? '/img/image-no-available.jpg' : poster" class="aspect-ratio-16:9 object-fill h-96 md:h-64 lg:h-96" @error="errorLoad=true">
        <h4 class="text-md text-center text-primary mt-2 font-bold">{{media.Title}} <span v-if="media.Year !== 'N/A'" class="font-normal">{{`- (${media.Year})`}}</span></h4>
    </div>
</template>

<script lang="ts" setup>
    const {media} = defineProps<{media: mediaItem}>();

    const poster = computed(() => {
        return media.Poster === 'N/A' ? '/img/image-no-available.jpg' : media.Poster
    })

    const errorLoad = ref(false)

</script>