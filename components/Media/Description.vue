<template>
    <div class="grid place-items-center h-full">
        <div  v-if="!mediaDescription || mediaDescriptionError?.Error" class="grid place-items-center h-full">
            <h1 class="text-primary text-xl font-bold text-center">The movie information is not available, please try later</h1>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-[max-content_1fr_1fr] gap-10">
            <div class="hidden md:block w-60">
                <UtilsImgWithDefault :url="mediaDescription?.Poster" :alt="`Principal photo of ${mediaDescription?.Title}`" class="aspect-[2/3] object-fill" />
            </div>
            <section class="md:col-span-2">
                <h1 class="text-primary text-2xl font-bold mb-4">{{ mediaDescription?.Title }}</h1>
                <p class="text-primary text-md">
                    {{ mediaDescription?.Plot }}
                </p>
                <div class="media-description-information grid-cols-[max-content_1fr] md:grid-cols-[max-content_1fr_max-content_1fr] gap-2">
                    <span v-if="releasedDate">Released date:</span>
                    <span v-if="releasedDate">{{ releasedDate }}</span>

                    <span v-if="genres">Genre:</span>
                    <span v-if="genres" class="flex flex-row gap-1">
                        <span v-for="genre in genres" :key="genre" class="background-primary text-primary text-sm rounded-md p-1 " >{{ genre }}</span>
                    </span>

                    <span v-if="language">Language:</span>
                    <span v-if="language">{{ language }}</span>
                
                    <span v-if="actors">Actors:</span>
                    <span v-if="actors">{{ actors }}</span>
                
                    <span v-if="rating">Rating:</span>
                    <span v-if="rating">{{ rating }}</span>
                
                    <span v-if="writers">Writer:</span>
                    <span v-if="writers">{{ writers }}</span>
                    
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type {responseError} from "~/interfaces/responseError"
    import type {responseDescription} from "~/interfaces/responseDescription"
    import {useStorage} from '@vueuse/core'

    const {id} = defineProps<{id: string}>();

    const urlGetDescription = computed(()=>{
        return `/api/getByID?id=${id.trim()}`
    })

    const {data} = await useFetch<responseDescription | responseError | null>(urlGetDescription);

    //Validate types
    const mediaDescription = computed(() =>
        data.value && "Title" in data.value ? data.value as responseDescription : undefined
    )
    const mediaDescriptionError = computed(() =>
        data.value && "Error" in data.value ? data.value as responseError : undefined
    )
    

    const lastMediaLook = useStorage<responseDescription[]>('last-media-look', []);
    const updateLocalStorage = () => { 
        if(mediaDescription.value) {
            const isRecientlyViewed = lastMediaLook.value.findIndex(mediaElement => mediaElement.imdbID === mediaDescription.value?.imdbID)
            
            //Verify if the element is in the localstorage and adds 1 view more
            if(isRecientlyViewed !== -1 && lastMediaLook.value && lastMediaLook.value[isRecientlyViewed] && lastMediaLook.value[isRecientlyViewed].views)
                lastMediaLook.value[isRecientlyViewed].views++;
            else {
                mediaDescription.value.views = 1
                lastMediaLook.value.unshift(mediaDescription.value)
            }
                
            //Removes the oldest element in the array 
            if(lastMediaLook.value.length > 10)
                lastMediaLook.value.pop()
        }
    }
    onMounted(() => {
        updateLocalStorage();
    })
    onActivated(()=> {
        updateLocalStorage();
    })
    watch(()=>mediaDescription.value, () =>{
        if(import.meta.client && mediaDescription.value)
            updateLocalStorage()
    })

    const releasedDate = computed(() => {
        return (mediaDescription.value && mediaDescription.value?.Released !== 'N/A') ? new Date(mediaDescription.value.Released).toLocaleDateString("en") : null; 
    })

    const genres = computed(() => {
        return (mediaDescription.value  && mediaDescription.value?.Genre !== 'N/A') ? mediaDescription.value?.Genre.split(',') : null; 
    })

    const language = computed(() => {
        return (mediaDescription.value  && mediaDescription.value?.Language !== 'N/A') ? mediaDescription.value?.Language : null; 
    })

    const actors = computed(() => {
        return (mediaDescription.value  && mediaDescription.value?.Actors !== 'N/A') ? mediaDescription.value?.Actors : null; 
    })

    const rating = computed(() => {
        return (mediaDescription.value  && mediaDescription.value?.imdbRating !== 'N/A') ? mediaDescription.value?.imdbRating : null; 
    })

    const writers = computed(() => {
        return (mediaDescription.value  && mediaDescription.value?.Writer !== 'N/A') ? mediaDescription.value?.Writer : null; 
    })

    
</script>

<style lang="scss">
    .media-description-information {
        @apply grid md:gap-5 justify-start mt-5;
        span {
            @apply text-gray-900 dark:text-white;
        }
    }
</style>