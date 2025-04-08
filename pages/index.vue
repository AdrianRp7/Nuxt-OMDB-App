<template>
    <div>
        <h1 class="text-2xl text-primary font-bold text-center my-5">NuxtOMDb APP</h1>
        <h3 class="text-xl text-secondary font-bold">
            Featured Movies
        </h3>
        <div v-if="movies.length !== 0" class="slider flex flex-row gap-4 overflow-x-auto mt-5 pb-4" >
            <nuxt-link v-for="movie in movies" :key="movie.imdbID" :to="`/movies/${movie.imdbID}`" class="md:w-1/4 2xl:w-1/5 grow-0 shrink-0 md:basis-1/4 2xl:basis-1/5" >
                <MediaCard :media="movie" />
            </nuxt-link>
        </div>
        <div v-else>
            <p class="text-sm text-secondary mt-5">Not featured movies available</p>
        </div>

        <h3 class="text-xl text-secondary font-bold mt-10">
            Featured Series
        </h3>
        <div v-if="series.length !== 0" class="slider flex flex-row gap-4 overflow-x-auto mt-5 pb-4 mb-5">
            <nuxt-link v-for="serie in series" :key="serie.imdbID" :to="`/series/${serie.imdbID}`" class="md:w-1/4 2xl:w-1/5 grow-0 shrink-0 md:basis-1/4 2xl:basis-1/5" >
                <MediaCard :media="serie" />
            </nuxt-link>
        </div>
        <div v-else>
            <p class="text-sm text-secondary mt-5">Not featured series available</p>
        </div>
    </div>
</template>


<script lang="ts" setup>
    import type {responseSearch} from "~/interfaces/responseSearch"
    import type {responseError} from "~/interfaces/responseError"
    import type { mediaItem } from "~/interfaces/mediaItem";

    
    const { data: responseMovies} = await useFetch<responseSearch | responseError | null >(`/api/search/?searchTerm=local&type=movie&page=1`);
    const { data: responseSeries} = await useFetch<responseSearch | responseError | null >(`/api/search/?searchTerm=local&type=series&page=1`);

    const movies = computed(() =>
        responseMovies.value && "Search" in responseMovies.value ? responseMovies.value.Search as mediaItem[] : []
    )
    const series = computed(() =>
        responseSeries.value && "Search" in responseSeries.value ? responseSeries.value.Search as mediaItem[] : []
    )
</script>