<template>
    <div class="grid place-items-center h-full">
        <div  v-if="!data || data.Error" class="grid place-items-center h-full">
            <h1 class="text-primary text-xl font-bold text-center">The movie information is not available, please try later</h1>
        </div>
        <div v-else class="grid grid-cols-1 md:grid-cols-[max-content_1fr_1fr] gap-10">
            <div class="hidden md:block w-60">
                <UtilsImgWithDefault :url="data?.Poster" :alt="`Principal photo of ${data?.Title}`" class="aspect-[2/3] object-fill" />
            </div>
            <section class="md:col-span-2">
                <h1 class="text-primary text-2xl font-bold mb-4">{{ data?.Title }}</h1>
                <p class="text-primary text-md">
                    {{ data?.Plot }}
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

    const {data} = await useFetch<responseDescription | responseError | null>(urlGetDescription, {
        server: false,
        cache: 'no-store'
    });


    const lastMediaLook = useStorage<responseDescription[]>('last-media-look', []);
    const updateLocalStorage = () => { 
        if(data.value) {
            const isRecientlyViewed = lastMediaLook.value.findIndex(mediaElement => mediaElement.imdbID === data.value.imdbID)
            
            //Verify if the element is in the localstorage and adds 1 view more
            if(isRecientlyViewed !== -1)
                lastMediaLook.value[isRecientlyViewed].views++
            else {
                data.value.views = 1
                lastMediaLook.value.unshift(data.value)
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
    watch(()=>data.value, () =>{
        if(import.meta.client && data.value)
            updateLocalStorage()
    })

    const releasedDate = computed(() => {
        return (data && data.value?.Released !== 'N/A') ? new Date(data.value.Released).toLocaleDateString("en") : null; 
    })

    const genres = computed(() => {
        return (data && data.value?.Genre !== 'N/A') ? data.value.Genre.split(',') : null; 
    })

    const language = computed(() => {
        return (data && data.value?.Language !== 'N/A') ? data.value.Language : null; 
    })

    const actors = computed(() => {
        return (data && data.value?.Actors !== 'N/A') ? data.value.Actors : null; 
    })

    const rating = computed(() => {
        return (data && data.value?.imdbRating !== 'N/A') ? data.value.imdbRating : null; 
    })

    const writers = computed(() => {
        return (data && data.value?.Writer !== 'N/A') ? data.value.Writer : null; 
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