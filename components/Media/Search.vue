<template>
    <div class="flex flex-col justify-center">
        <div class="control text-center">
            <input v-model.trim="searchTerm" type="text" placeholder="Ex: Batman" class="input mx-auto w-52 mt-5 ">
            <p v-if="mediaSearchError" class="text-sm text-center text-error mt-2">{{mediaSearchError.Error}}</p>
        </div>
        <div v-if="medias.length !== 0" class="mt-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
            <nuxt-link v-for="media in medias" :key="media.imdbID" :to="`/${linkType}/${media.imdbID}`" class="justify-self-stretch place-items-center h-full" >
                <MediaCard :media="media"/>
            </nuxt-link>
        </div>

        <div v-if="medias.length !== 0 && !loading" class="mx-auto mt-5">
            <button v-if="page < totalPages" class="btn-primary" @click="nextPage">Load more</button>
        </div>
        <div v-if="loading" class="mx-auto mt-5">
            <UtilsLoader :classes-spin="'fill-green-400 dark:fill-green-500 size-12 text-white mx-auto mb-8'"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type { responseSearch } from "~/interfaces/responseSearch"
    import type { responseError } from "~/interfaces/responseError"
    import type { mediaTypes } from "~/types/mediaTypes";
    import type { mediaItem } from "~/interfaces/mediaItem"
    
    // import { refDebounced } from '@vueuse/core'

    const {type} = defineProps<{type: mediaTypes}>();

    const linkType = computed(()=> {
        return type === 'movie' ? 'movies' : 'series'
    })

    const searchTerm = ref("");
    const searchTermDebounced = refDebounced(searchTerm, 500);
    
    /*** Pagination ***/
    const page = ref(1);
    const loading = ref(false)

    const totalPages = computed(() => {
        if(mediaSearch.value && mediaSearch.value?.totalResults)
            return Math.ceil(parseInt(mediaSearch.value?.totalResults) / 10)

        return 0
    })
    

    const nextPage = () => {
        page.value++
        loading.value = true
    }
    /*** Fetch Api ***/

    const urlSearch = computed (() => {
        return `/api/search/?searchTerm=${searchTermDebounced.value.trim()}&type=${type}&page=${page.value}`
    })

    const medias = ref<mediaItem[]>([]);
    

    const { data, error } = await useFetch<responseSearch | responseError | null >(urlSearch, {
        immediate: false,
    });

    const mediaSearch = computed(() =>
        data.value && "Search" in data.value ? data.value as responseSearch : undefined
    )
    const mediaSearchError = computed(() => {
        if(error.value)
            return {Response: false, Error: "server unavailable"}
        else
            return data.value && "Error" in data.value ? data.value as responseError : undefined
    })

    watch(searchTermDebounced, ()=> {
        medias.value = []
        loading.value = true
    })

    watch(mediaSearch, ()=> {
        medias.value = mediaSearch.value?.Search ? medias.value.concat(mediaSearch?.value?.Search) : medias.value
        loading.value = false
    })

    watch(mediaSearchError, ()=> {
        loading.value = false
    })

    watch(error, ()=> {
        if(error !== null)
            loading.value = false
    })

</script>