<template>
    <Suspense>
        <template #default>
            <MediaDescription :id="id"/>
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
    const id = route.params.id;
</script>