<template>
    <div class="flex flex-col justify-center">
        <div class="control text-center">
            <input v-model="searchTerm" type="text" class="background-secondary w-52 mx-auto rounded-md text-primary py-1 px-4 mt-5 focus-visible:outline-none shadow-none">
            <p v-if="data?.Error" class="text-sm text-center text-error mt-2">{{data.Error}}</p>
        </div>
        <div v-if="movies.length !== 0" class="mt-5 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="movie in movies" :key="movie.imdbID" class="justify-self-stretch" >
                <MediaCard :movie="movie" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type {responseSearch, responseSearchError} from "~/interfaces/responseSearch"
    import type { mediaTypes } from "~/types/mediaTypes";

    const searchTerm = ref("");
    const page = ref(1);


    const {type} = defineProps<{type: mediaTypes}>();

    const urlSearch = computed (() => {
        return `api/search/?searchTerm=${searchTerm.value}&type=${type}&page=${page.value}`
    })

    const movies = computed<mediaItem>(() => {
        return data?.value?.Search ? data?.value?.Search : []
    })

    const { data } = await useFetch<responseSearch | responseSearchError | null >(urlSearch, {
        immediate: false,
        watch: [searchTerm, page, () => type]
    });


</script>