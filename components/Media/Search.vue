<template>
    <div class="flex flex-col justify-center">
        <div class="control text-center">
            <input v-model="searchTerm" type="text" class="background-secondary w-52 mx-auto rounded-md text-primary py-1 px-4 mt-5 focus-visible:outline-none shadow-none">
            <p v-if="data?.Error" class="text-sm text-center text-error mt-2">{{data.Error}}</p>
        </div>
        <div v-if="medias.length !== 0" class="mt-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
            <div v-for="media in medias" :key="media.imdbID" class="justify-self-stretch place-items-center h-full" >
                <MediaCard :media="media" />
            </div>
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
    import type {responseSearch} from "~/interfaces/responseSearch"
    import type {responseError} from "~/interfaces/responseError"
    import type { mediaTypes } from "~/types/mediaTypes";
    import { refDebounced } from '@vueuse/core'

    const {type} = defineProps<{type: mediaTypes}>();

    const searchTerm = ref("");
    const searchTermDebounced = refDebounced(searchTerm, 500);
    
    /*** Pagination ***/
    const page = ref(1);
    const loading = ref(false)

    const totalPages = computed(() => {
        return data?.value?.totalResults ? Math.ceil(data?.value?.totalResults/10) : 0
    })

    const nextPage = () => {
        page.value++
        loading.value = true
    }
    /*** Fetch Api ***/

    const urlSearch = computed (() => {
        return `api/search/?searchTerm=${searchTermDebounced.value.trim()}&type=${type}&page=${page.value}`
    })

    const medias = ref<mediaItem[]>([]);
    

    const { data } = await useFetch<responseSearch | responseError | null >(urlSearch, {
        immediate: false,
    });

    watch(searchTermDebounced, ()=> {
        medias.value = []
        loading.value = true
    })

    watch(() => data.value, ()=> {
        medias.value = data?.value?.Search ? medias.value.concat(data?.value?.Search) : medias.value
        loading.value = false
    })

</script>