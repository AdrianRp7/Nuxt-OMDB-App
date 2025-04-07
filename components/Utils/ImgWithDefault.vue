<template>
    <img :src="errorLoad ? '/img/image-no-available.jpg' : url" @error="errorLoad">
</template>

<script lang="ts" setup>
    const {url} = defineProps<{url: string}>();

    const errorLoad = ref(false)
</script>