<template>
    <div class="background-primary hover-transition card flex flex-col cursor-pointer p-2 border border-gray-300 dark:border-0 rounded-md h-full max-w-[320px] sm:max-w-full w-full hover:scale-[1.05]">
        <UtilsImgWithDefault :url="poster" class="aspect-[2/3] object-fill h-96 md:h-64 lg:h-96 " />
        <h4 class="text-md text-center text-primary mt-2 font-bold">{{media.Title}} <span v-if="media.Year !== 'N/A'" class="font-normal">{{`- (${media.Year})`}}</span></h4>
    </div>
</template>

<script lang="ts" setup>
    import type {mediaItem} from "~/interfaces/mediaItem"
    const {media} = defineProps<{media: mediaItem}>();

    const poster = computed(() => {
        return media.Poster === 'N/A' ? '/img/image-no-available.jpg' : media.Poster
    })
</script>

