<template>
    <div>
        <h1 class="text-2xl text-primary font-bold text-center mt-5">NuxtOMDb APP</h1>
        <h3 class="text-xl text-secondary font-bold">
            Featured Movies
        </h3>
        <div v-if="responseMovies" class="flex flex-row gap-4 overflow-x-auto mt-5 pb-4" >
            <nuxt-link v-for="movie in responseMovies?.Search" :key="movie.imdbID" :to="`/movies/${movie.imdbID}`" class="md:w-1/4 2xl:w-1/5 grow-0 shrink-0 md:basis-1/4 2xl:basis-1/5" >
                <MediaCard :media="movie" />
            </nuxt-link>
        </div>

        <h3 class="text-xl text-secondary font-bold mt-10">
            Featured Series
        </h3>
        <div v-if="responseSeries" class="flex flex-row gap-4 overflow-x-auto mt-5 pb-4 mb-5">
            <nuxt-link v-for="serie in responseSeries?.Search" :key="serie.imdbID" :to="`/series/${serie.imdbID}`" class="md:w-1/4 2xl:w-1/5 grow-0 shrink-0 md:basis-1/4 2xl:basis-1/5" >
                <MediaCard :media="serie" />
            </nuxt-link>
        </div>
    </div>
</template>


<script lang="ts" setup>
    import type {responseSearch} from "~/interfaces/responseSearch"
    import type {responseError} from "~/interfaces/responseError"

    const movies = ref<mediaItem[]>([]);
    const series = ref<mediaItem[]>([]);

    const { data: responseMovies} = await useFetch<responseSearch | responseError | null >(`/api/search/?searchTerm=local&type=movie&page=1`);
    const { data: responseSeries} = await useFetch<responseSearch | responseError | null >(`/api/search/?searchTerm=local&type=series&page=1`);

    
    movies.value = responseMovies?.value?.Search ?? []
    series.value = responseSeries?.value?.Search ?? []
    


</script>