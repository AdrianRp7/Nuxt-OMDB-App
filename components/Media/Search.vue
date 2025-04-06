<template>
    <div class="flex flex-col justify-center">
        <div class="control text-center">
            <input v-model="searchTerm" type="text" class="background-secondary w-52 mx-auto rounded-md text-primary py-1 px-4   mt-5 focus-visible:outline-none shadow-none">
            <p v-if="data?.Error" class="text-sm text-center text-error mt-2">{{data.Error}}</p>
        </div>

        <div v-if="data?.totalResults">
            {{ data.totalResults }}
        </div>
    </div>
</template>

<script lang="ts" setup>
    import type {responseSearch, responseSearchError} from "~/interfaces/responseSearch"
    import type { mediaTypes } from "~/types/mediaTypes";
    
    const searchTerm = ref("");
    const page = ref(1);

    const props = defineProps<{type: mediaTypes}>();

    const urlSearch = computed (() => {
        return `api/search/?searchTerm=${searchTerm.value}&type=${props.type} &page=${page.value}`
    })

    const { data } = await useFetch<responseSearch | responseSearchError | null >(urlSearch, {
        inmediate: false
    });

    

</script>