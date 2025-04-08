<template>
    <Suspense>
        <template #default>
            <div class="flex flex-col justify-center h-full">
                <nuxt-link to="/series" class="mt-5 text-xl text-primary font-bold cursor-pointer">&lt; Go Back</nuxt-link>
                <MediaDescription :id="id" />
            </div>
        </template>
        <template #fallback>
            <div class="grid place-items-center h-full">
                <UtilsLoader :classes-spin="'fill-green-400 dark:fill-green-500 size-12 text-white mx-auto mb-8'"/>
            </div>
        </template>
    </Suspense>
</template>

<script lang="ts" setup>
    const route = useRoute();
    const id = ref<string>(route.params.id as string);

</script>