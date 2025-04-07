<template>
    <div>
        <div v-if="!data || data.error">
            <h1 class="text-primary text-xl font-bold text-center">The movie information is not available, please try later</h1>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="hidden md:block">
                <UtilsImgWithDefault :src="data.Poster" class="aspect-[2/3] object-fill" />
            </div>
            <div class="md:col-span-2">
                <h1 class="text-primary text-xl"></h1>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import type {responseError} from "~/interfaces/responseError"
    import type {responseDescription} from "~/interfaces/responseDescription"
    const route = useRoute();
    const id = route.params.id;

    const urlGetDescription = computed(()=>{
        return `api/getById?id=${id}`
    })

    const {data} = useFetch<responseDescription | responseError | null>(urlGetDescription)


</script>